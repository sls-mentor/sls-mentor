import {
  FunctionConfiguration,
  GetFunctionConfigurationCommand,
} from '@aws-sdk/client-lambda';

import { lambdaClient } from '../../clients';
import { GuardianARN, LambdaFunctionARN } from '../../types';

const fetchLambdaConfigurationByArn = async (
  arn: LambdaFunctionARN,
): Promise<{
  arn: LambdaFunctionARN;
  configuration: FunctionConfiguration;
}> => ({
  arn,
  configuration: await lambdaClient.send(
    new GetFunctionConfigurationCommand({
      FunctionName: arn.getFunctionName(),
    }),
  ),
});

export const fetchAllLambdaConfigurations = async (
  resources: GuardianARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    configuration: FunctionConfiguration;
  }[]
> => {
  const lambdas = GuardianARN.filterArns(resources, LambdaFunctionARN);

  return await Promise.all(
    lambdas.map(arn => fetchLambdaConfigurationByArn(arn)),
  );
};
