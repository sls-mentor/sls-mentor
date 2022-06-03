import {
  FunctionConfiguration,
  GetFunctionConfigurationCommand,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { ARN } from '@aws-sdk/util-arn-parser';
import { Resource } from '../types';
import { filterLambdaFromResources } from './filterLambdaFromResources';

const fetchLambdaConfigurationByArn = async (
  arn: ARN,
  client: LambdaClient,
): Promise<FunctionConfiguration> =>
  await client.send(
    new GetFunctionConfigurationCommand({ FunctionName: arn.resource }),
  );

export const fetchAllLambdaConfigurations = async (
  resources: Resource[],
): Promise<FunctionConfiguration[]> => {
  const client = new LambdaClient({});

  const lambdas = filterLambdaFromResources(resources);
  const lambdaConfigurations = await Promise.all(
    lambdas.map(({ arn }) => fetchLambdaConfigurationByArn(arn, client)),
  );

  return lambdaConfigurations;
};
