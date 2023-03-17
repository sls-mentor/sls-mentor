import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const AWS_MAXIMUM_TIMEOUT = 900;

const hasMaximumTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_MAXIMUM_TIMEOUT;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: !hasMaximumTimeout(configuration),
    timeout: configuration.Timeout,
  }));

  return { results };
};

export const noMaxTimeout: Rule = {
  ruleName: 'Lambda: No Maximum Timeout',
  errorMessage: 'The following functions have their timeout set as the maximum',
  run,
  fileName: 'noMaxTimeout',
  categories: ['GreenIT', 'ITCosts', 'Stability'],
  level: 3,
  service: 'Lambda',
  easyToFix: true,
  severity: 'high',
} as Rule;
