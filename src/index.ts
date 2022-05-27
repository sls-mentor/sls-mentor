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

process.env.AWS_PROFILE = 'safetracker-dev';

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
      StackName: 'safetracker-backend-dev',
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

  return await Promise.all(
    rules.map(async rule => {
      return { rule, result: (await rule.run(resourcesArn)).results };
    }),
  );
};

export const handleGuardianChecksCommand = async (options: {
  tags: Tag[];
  short: boolean;
}): Promise<void> => {
  process.stdout.write('Running Checks...');
  const results = await runGuardianChecks(options);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  console.log('Checks results: ');

  let atLeastOneFailed = false;
  results.forEach(({ rule, result }) => {
    const successCount = result.filter(e => e.success).length;
    const failCount = result.length - successCount;

    atLeastOneFailed = atLeastOneFailed || failCount > 0;
    const successRatio = successCount / (failCount + successCount);
    const failRatio = failCount / (failCount + successCount);
    console.log(
      successRatio < 0.7
        ? '\x1b[31m'
        : successRatio < 1
        ? '\x1b[33m'
        : '\x1b[32m',
      `${rule.ruleName}:\n`,
      `[${'◼'.repeat(Math.floor(20 * successRatio))}${' '.repeat(
        Math.floor(20 * failRatio),
      )}] ${successRatio * 100}%`,
      '\x1b[0m\n',
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (options.short || !atLeastOneFailed)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    process.exit(atLeastOneFailed ? 1 : 0);

  console.log('\nChecks details: ');
  const failedByResource: Record<string, Record<string, string>[]> = {};

  results.forEach(({ rule, result }) => {
    result
      .filter(e => !e.success)
      .forEach(resourceResult => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (failedByResource[resourceResult.arn] === undefined)
          failedByResource[resourceResult.arn] = [];
        const extraArgs = Object.fromEntries(
          Object.keys(resourceResult)
            .filter(k => !['arn', 'success'].includes(k))
            .map(k => [k, resourceResult[k]]),
        );
        failedByResource[resourceResult.arn].push({
          ruleName: rule.ruleName,
          ...extraArgs,
        });
      });
  });

  Object.keys(failedByResource).forEach(ressourceArn => {
    console.error(
      '\n\n\x1b[47m\x1b[31m',
      `Details on ressource "${ressourceArn}" :`,
      '\x1b[0m\n',
    );
    console.table(failedByResource[ressourceArn]);
  });
};
