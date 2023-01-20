import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { SlsMentorLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

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

const rule: Rule = {
  ruleName: 'Lambda: No Maximum Timeout',
  errorMessage: 'The following functions have their timeout set as the maximum',
  run,
  fileName: 'noMaxTimeout',
  categories: [Category.GREEN_IT, Category.IT_COSTS, Category.STABILITY],
  level: SlsMentorLevel.Level3,
} as Rule;

export default rule;
