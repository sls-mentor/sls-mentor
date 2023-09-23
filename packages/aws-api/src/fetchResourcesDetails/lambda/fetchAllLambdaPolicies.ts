import { GetPolicyCommand } from '@aws-sdk/client-lambda';

import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

// Incomplete, update if needed
export type Policy = {
  Statement?: {
    Condition?: {
      ArnLike?: {
        'AWS:SourceArn'?: string;
      };
    };
  }[];
};

const fetchLambdaPolicyByArn = async (
  arn: LambdaFunctionARN,
): Promise<Policy | undefined> => {
  try {
    const commandOutput = await lambdaClient.send(
      new GetPolicyCommand({ FunctionName: arn.getFunctionName() }),
    );
    const policy = JSON.parse(commandOutput.Policy ?? '') as Policy;

    return policy;
  } catch (e) {
    return;
  }
};
export const fetchAllLambdaPolicies = async (
  resourceArns: CustomARN[],
): Promise<{ arn: LambdaFunctionARN; policy: Policy | undefined }[]> => {
  const lambdas = CustomARN.filterArns(resourceArns, LambdaFunctionARN);

  return Promise.all(
    lambdas.map(async arn => ({
      arn,
      policy: await fetchLambdaPolicyByArn(arn),
    })),
  );
};
