import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';

const AWS_MAXIMUM_TIMEOUT = 900;

const hasMaximumTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_MAXIMUM_TIMEOUT;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasMaximumTimeout(lambdaConfiguration),
    timeout: lambdaConfiguration.Timeout,
  }));

  return { results };
};

export default {
  ruleName: 'No max timeout',
  errorMessage:
    'The following functions have their timeout set as the maximum.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-max-timeout) for impact and how to to resolve.',
  run,
} as Rule;
