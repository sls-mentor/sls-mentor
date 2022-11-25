import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import { S3BucketARN, GuardianARN } from '../types';

export const createARNFromCloudFormation = ({
  ResourceType,
  PhysicalResourceId,
}: StackResourceSummary): GuardianARN | undefined => {
  if (PhysicalResourceId === undefined || ResourceType === undefined) {
    return undefined;
  }

  switch (ResourceType) {
    case 'AWS::S3::Bucket':
      return S3BucketARN.fromPhysicalId(PhysicalResourceId);
    default:
      return;
  }
};

export const fetchCloudFormationResourceArns = async (
  cloudformationStacks: string[],
): Promise<GuardianARN[]> => {
  const cloudFormationClient = new CloudFormationClient({});

  const resources: StackResourceSummary[] = [];
  for (const stack of cloudformationStacks) {
    for await (const page of paginateListStackResources(
      { client: cloudFormationClient },
      { StackName: stack },
    )) {
      resources.push(...(page.StackResourceSummaries ?? []));
    }
  }

  return resources
    .map(createARNFromCloudFormation)
    .filter((arn): arn is GuardianARN => arn !== undefined);
};
