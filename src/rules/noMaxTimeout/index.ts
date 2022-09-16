import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { Rule } from '../../types';

const AWS_MAXIMUM_TIMEOUT = 900;

const hasMaximumTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_MAXIMUM_TIMEOUT;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasMaximumTimeout(lambdaConfiguration),
    timeout: lambdaConfiguration.Timeout,
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda No Maximum Timeout',
  errorMessage:
    'The following functions have their timeout set as the maximum.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/no-max-timeout.md) for impact and how to resolve.',
  run,
};

export default rule;
