import {
  GetFunctionEventInvokeConfigCommand,
  GetFunctionEventInvokeConfigCommandOutput,
} from '@aws-sdk/client-lambda';
import { lambdaClient } from '../../clients';
import { CustomARN, LambdaFunctionARN } from '../../types';

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
  resourceArns: CustomARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    config: GetFunctionEventInvokeConfigCommandOutput | undefined;
  }[]
> => {
  const lambdas = CustomARN.filterArns(resourceArns, LambdaFunctionARN);

  return await Promise.all(
    lambdas.map(async arn => ({
      arn,
      config: await fetchLambdaInvokeEventConfigByArn(arn),
    })),
  );
};
