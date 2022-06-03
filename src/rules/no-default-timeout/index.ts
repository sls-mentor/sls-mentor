import {
  GetFunctionConfigurationCommand,
  GetFunctionConfigurationCommandOutput,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { Resource, Rule } from '../../types';

const AWS_DEFAULT_TIMEOUT = 3;

const hasDefaultTimeout = (
  lambdaConfiguration: GetFunctionConfigurationCommandOutput,
) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_DEFAULT_TIMEOUT;

const run = async (
  resources: Resource[],
): Promise<{
  results: ({ arn: string; success: boolean } & Record<string, unknown>)[];
}> => {
  const client = new LambdaClient({});
  const lambdaNames = resources
    .filter(({ arn }) => arn.service === 'lambda')
    .map(({ arn }) => arn.resource);
  const lambdaConfigurations = await Promise.all(
    lambdaNames.map(FunctionName =>
      client.send(new GetFunctionConfigurationCommand({ FunctionName })),
    ),
  );
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasDefaultTimeout(lambdaConfiguration),
    timeout: lambdaConfiguration.Timeout,
  }));

  return { results };
};

export default {
  ruleName: 'No default timeout',
  errorMessage:
    'The following functions have their timeout set as default.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-default-timeout) for impact and how to to resolve.',
  run,
} as Rule;
