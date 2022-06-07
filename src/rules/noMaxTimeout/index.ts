import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

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
  ruleName: RuleDisplayNames.NO_MAX_TIMEOUT,
  errorMessage: ErrorMessages.NO_MAX_TIMEOUT,
  run,
} as Rule;
