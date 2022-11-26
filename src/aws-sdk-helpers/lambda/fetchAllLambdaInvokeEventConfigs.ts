import {
  GetFunctionEventInvokeConfigCommand,
  GetFunctionEventInvokeConfigCommandOutput,
} from '@aws-sdk/client-lambda';
import { lambdaClient } from '../../clients';
import { GuardianARN, LambdaFunctionARN } from '../../types';

const fetchLambdaInvokeEventConfigByArn = async (
  arn: LambdaFunctionARN,
): Promise<GetFunctionEventInvokeConfigCommandOutput | undefined> => {
  try {
    return await lambdaClient.send(
      new GetFunctionEventInvokeConfigCommand({
        FunctionName: arn.getFunctionName(),
      }),
    );
  } catch (e) {
    return;
  }
};

export const fetchAllLambdaInvokeEventConfigs = async (
  resourceArns: GuardianARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    config: GetFunctionEventInvokeConfigCommandOutput | undefined;
  }[]
> => {
  const lambdas = GuardianARN.filterArns(resourceArns, LambdaFunctionARN);

  return await Promise.all(
    lambdas.map(async arn => ({
      arn,
      config: await fetchLambdaInvokeEventConfigByArn(arn),
    })),
  );
};
