import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';
import { ARN } from '@aws-sdk/util-arn-parser';
import {
  getSupportedResourceArn,
  ressourceTypeToRessources,
} from './getSupportedResourceArn';

export const fetchCloudFormationResourceArns = async (
  cloudformationStacks: string[],
): Promise<ARN[]> => {
  const cloudFormationClient = new CloudFormationClient({});
  const stsClient = new STSClient({});

  const resources: StackResourceSummary[] = [];
  for (const stack of cloudformationStacks) {
    for await (const page of paginateListStackResources(
      { client: cloudFormationClient },
      { StackName: stack },
    )) {
      resources.push(...(page.StackResourceSummaries ?? []));
    }
  }

  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  if (Account === undefined) {
    throw new Error(
      'IAM user or role whose credentials are used to call the operations with the STS Client are undefined.',
    );
  }
  const region =
    process.env.AWS_REGION ?? (await cloudFormationClient.config.region());

  const supportedRessources = Object.keys(ressourceTypeToRessources);

  return resources.flatMap(({ ResourceType, PhysicalResourceId }) =>
    PhysicalResourceId !== undefined &&
    ResourceType !== undefined &&
    supportedRessources.includes(ResourceType)
      ? getSupportedResourceArn(
          { ResourceType, PhysicalResourceId },
          region,
          Account,
        )
      : [],
  );
};
