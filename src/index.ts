import {
  CloudFormationClient,
  ListStackResourcesCommand,
} from '@aws-sdk/client-cloudformation';
import {
  GetResourcesCommand,
  ResourceGroupsTaggingAPIClient,
} from '@aws-sdk/client-resource-groups-tagging-api';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

import { ARN, parse } from '@aws-sdk/util-arn-parser';
import {
  LightBundleRule,
  noDefaultMemory,
  NoDefaultTimeout,
  NoMaxTimeout,
  NoSharedIamRoles,
} from './rules';
import { Tag } from './cli';

process.env.AWS_PROFILE = 'nathan';

// index is owner of fetching scoped  resources (CFN or tags).
// each rule owns details fetching

type Resource = { arn: ARN };

export interface Rule {
  ruleName: string;
  errorMessage: string;
  run: (resources: Resource[]) => Promise<{
    results: ({ arn: string; success: boolean } & Record<string, unknown>)[];
  }>;
}

const fetchTaggedResources = async (tags: Tag[]): Promise<{ arn: ARN }[]> => {
  const tagClient = new ResourceGroupsTaggingAPIClient({});

  const { ResourceTagMappingList: taggedResources } = await tagClient.send(
    new GetResourcesCommand({
      TagFilters: tags.map(({ key, value }) => {
        return { Key: key, Values: [value] };
      }),
    }),
  );
  if (taggedResources === undefined || taggedResources.length === 0) {
    throw new Error('No resources');
  }

  return taggedResources.map(resource => {
    return {
      arn: parse(resource.ResourceARN as string),
    };
  });
};

const fetchCloudFormationResources = async (): Promise<{ arn: ARN }[]> => {
  const cloudFormationClient = new CloudFormationClient({});
  const stsClient = new STSClient({});

  const { StackResourceSummaries: resources } = await cloudFormationClient.send(
    new ListStackResourcesCommand({
      StackName: 'aws-kumo-resto-dev',
    }),
  );
  if (!resources) {
    throw new Error('No resources');
  }
  const filteredResources = resources.filter(
    resource => resource.ResourceType === 'AWS::Lambda::Function',
  );

  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  const region = cloudFormationClient.config.region;

  return filteredResources.map(resource => {
    return {
      arn: parse(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `arn:aws:lambda:${region}:${Account}:function:${resource.PhysicalResourceId}`,
      ),
    };
  });
};

const fetchResources = async (tags: Tag[]) => {
  if (tags.length !== 0) {
    return fetchTaggedResources(tags);
  }

  return fetchCloudFormationResources();
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const runGuardianChecks = async ({
  tags,
}: {
  tags: Tag[];
}): Promise<
  {
    rule: Rule;
    result: ({ arn: string; success: boolean } & Record<string, unknown>)[];
  }[]
> => {
  const resourcesArn = await fetchResources(tags);
  const rules: Rule[] = [
    LightBundleRule,
    noDefaultMemory,
    NoDefaultTimeout,
    NoMaxTimeout,
    NoSharedIamRoles,
  ];

  let remaining = rules.length + 1;
  const decreaseRemaining = () => {
    remaining -= 1;
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
      `${remaining} check${remaining > 1 ? 's' : ''} remaining${
        remaining > 0 ? '...' : ' !'
      }`,
    );
    if (remaining === 0) console.log('\n');
  };
  decreaseRemaining();

  return await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(resourcesArn)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );
};
