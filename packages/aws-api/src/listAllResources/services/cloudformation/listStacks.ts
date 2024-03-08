import {
  CloudFormationClient,
  paginateListStacks,
  StackStatus,
} from '@aws-sdk/client-cloudformation';

import { CloudformationStackARN } from '@sls-mentor/arn';

export const listCloudformationStacks = async (): Promise<
  {
    stackArn: CloudformationStackARN;
    rootStackArn?: CloudformationStackARN;
  }[]
> => {
  const cloudFormationClient = new CloudFormationClient({});
  const cloudformationStacks: {
    stackArn: CloudformationStackARN;
    rootStackArn?: CloudformationStackARN;
  }[] = [];

  for await (const page of paginateListStacks(
    {
      client: cloudFormationClient,
    },
    {
      StackStatusFilter: Object.values(StackStatus).filter(
        status =>
          status !== StackStatus.DELETE_COMPLETE &&
          status !== StackStatus.DELETE_FAILED &&
          status !== StackStatus.DELETE_IN_PROGRESS,
      ),
    },
  )) {
    cloudformationStacks.push(
      ...(page.StackSummaries?.map(stack => ({
        stackArn: CloudformationStackARN.fromStackId(stack.StackId ?? ''),
        rootStackArn:
          stack.RootId !== undefined
            ? CloudformationStackARN.fromStackId(stack.RootId)
            : undefined,
      })) ?? []),
    );
  }

  return cloudformationStacks;
};
