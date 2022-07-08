import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import {
  paginateGetResources,
  ResourceGroupsTaggingAPIClient,
  ResourceTagMapping,
} from '@aws-sdk/client-resource-groups-tagging-api';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

import { ARN, parse } from '@aws-sdk/util-arn-parser';
import { displayProgress } from './display';
import {
  LightBundleRule,
  LimitedNumberOfLambdaVersions,
  noDefaultMemory,
  NoIdenticalCode,
  NoMaxTimeout,
  NoSharedIamRoles,
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from './rules';
import { ChecksResults, Options, Rule, Tag } from './types';

const fetchTaggedResourceArns = async (tags: Tag[]): Promise<ARN[]> => {
  const tagClient = new ResourceGroupsTaggingAPIClient({});

  const taggedResources: ResourceTagMapping[] = [];
  for await (const page of paginateGetResources(
    { client: tagClient },
    {
      TagFilters: tags.map(({ key, value }) => {
        return { Key: key, Values: [value] };
      }),
    },
  )) {
    taggedResources.push(...(page.ResourceTagMappingList ?? []));
  }

  return taggedResources.map(resource => parse(resource.ResourceARN as string));
};

const fetchCloudFormationResourceArns = async (
  cloudformation: string,
): Promise<ARN[]> => {
  const cloudFormationClient = new CloudFormationClient({});
  const stsClient = new STSClient({});

  const resources: StackResourceSummary[] = [];
  for await (const page of paginateListStackResources(
    { client: cloudFormationClient },
    { StackName: cloudformation },
  )) {
    resources.push(...(page.StackResourceSummaries ?? []));
  }

  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  const region =
    process.env.AWS_REGION ?? (await cloudFormationClient.config.region());

  return resources.flatMap(resource => {
    return getSupportedResourceArn(resource, region, Account);
  });
};

const getS3ResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 's3',
    region,
    accountId,
    resource,
  };
};

const getLambdaResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'lambda',
    region,
    accountId,
    resource,
  };
};

const getSupportedResourceArn = (
  { ResourceType, PhysicalResourceId }: StackResourceSummary,
  region: string,
  account: string | undefined,
): ARN[] => {
  const resourceARN = [];

  if (ResourceType === 'AWS::Lambda::Function') {
    resourceARN.push(
      getLambdaResourceArn(region, account ?? '', PhysicalResourceId ?? ''),
    );
  }

  if (ResourceType === 'AWS::S3::Bucket') {
    resourceARN.push(
      getS3ResourceArn(region, account ?? '', PhysicalResourceId ?? ''),
    );
  }

  return resourceARN;
};

const fetchResourceArns = async (
  cloudformation: string | undefined,
  tags: Tag[] | undefined,
) => {
  if (tags !== undefined) {
    return fetchTaggedResourceArns(tags);
  }

  if (cloudformation !== undefined) {
    return fetchCloudFormationResourceArns(cloudformation);
  }

  // Maybe replace with a check of all account on the specified region ?
  throw new Error('not enough argument specified');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const runGuardianChecks = async ({
  cloudformation,
  tags,
}: Options): Promise<ChecksResults> => {
  const resourceArns = await fetchResourceArns(cloudformation, tags);
  const rules: Rule[] = [
    LightBundleRule,
    NoIdenticalCode,
    noDefaultMemory,
    NoMaxTimeout,
    NoSharedIamRoles,
    UseArm,
    UseIntelligentTiering,
    LimitedNumberOfLambdaVersions,
    UnderMaxMemory,
  ];

  let remaining = rules.length + 1;

  const decreaseRemaining = () => {
    remaining -= 1;
    const rate = (rules.length - remaining) / rules.length;
    displayProgress(rate);
  };

  decreaseRemaining();

  return await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(resourceArns)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );
};
