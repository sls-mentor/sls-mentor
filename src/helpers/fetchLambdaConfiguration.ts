import {
  FunctionConfiguration,
  GetFunctionConfigurationCommand,
} from '@aws-sdk/client-lambda';

import { ARN } from '@aws-sdk/util-arn-parser';
import { lambdaClient } from '../clients';
import { Resource } from '../types';
import { filterLambdaFromResources } from './filterLambdaFromResources';

const fetchLambdaConfigurationByArn = async (
  arn: ARN,
): Promise<FunctionConfiguration> =>
  await lambdaClient.send(
    new GetFunctionConfigurationCommand({ FunctionName: arn.resource }),
  );

export const fetchAllLambdaConfigurations = async (
  resources: Resource[],
): Promise<FunctionConfiguration[]> => {
  const lambdas = filterLambdaFromResources(resources);
  const lambdaConfigurations = await Promise.all(
    lambdas.map(({ arn }) => fetchLambdaConfigurationByArn(arn)),
  );

  return lambdaConfigurations;
};
