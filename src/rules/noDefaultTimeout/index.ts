import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';
import { RuleNames } from '../../types/RuleNames';

const AWS_DEFAULT_TIMEOUT = 3;

const hasDefaultTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_DEFAULT_TIMEOUT;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasDefaultTimeout(lambdaConfiguration),
    timeout: lambdaConfiguration.Timeout,
  }));

  return { results };
};

export default {
  ruleName: RuleNames.NO_DEFAULT_TIMEOUT,
  errorMessage:
    'The following functions have their timeout set as default.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-default-timeout) for impact and how to to resolve.',
  run,
} as Rule;
