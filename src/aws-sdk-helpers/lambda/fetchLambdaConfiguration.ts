import {
  FunctionConfiguration,
  GetFunctionConfigurationCommand,
} from '@aws-sdk/client-lambda';

import { lambdaClient } from '../../clients';
import { GuardianARN, LambdaFunctionARN } from '../../types';

const fetchLambdaConfigurationByArn = async (
  arn: LambdaFunctionARN,
): Promise<FunctionConfiguration> =>
  await lambdaClient.send(
    new GetFunctionConfigurationCommand({
      FunctionName: arn.getFunctionName(),
    }),
  );

export const fetchAllLambdaConfigurations = async (
  resources: GuardianARN[],
): Promise<FunctionConfiguration[]> => {
  const lambdas = GuardianARN.filterArns(resources, LambdaFunctionARN);
  const lambdaConfigurations = await Promise.all(
    lambdas.map(arn => fetchLambdaConfigurationByArn(arn)),
  );

  return lambdaConfigurations;
};
