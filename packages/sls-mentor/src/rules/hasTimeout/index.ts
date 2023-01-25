import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { SlsMentorLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

const hasTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: hasTimeout(configuration),
    timeout: configuration.Timeout,
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda: Has Timeout',
  errorMessage: 'The following functions have no timeout',
  run,
  fileName: 'hasTimeout',
  categories: [Category.GREEN_IT, Category.IT_COSTS, Category.STABILITY],
  level: SlsMentorLevel.Level3,
} as Rule;

export default rule;
