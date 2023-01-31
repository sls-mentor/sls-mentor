import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { DEPRECATED_RUNTIMES } from 'constants/runtimes';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { SlsMentorLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

const hasDeprecatedRuntime = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Runtime !== undefined &&
  DEPRECATED_RUNTIMES.includes(lambdaConfiguration.Runtime);

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: !hasDeprecatedRuntime(configuration),
    runtime: configuration.Runtime,
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda: No Deprecated Runtime',
  errorMessage: 'The following functions have deprecated runtime',
  run,
  fileName: 'noDeprecatedRuntime',
  categories: [Category.STABILITY, Category.SECURITY],
  level: SlsMentorLevel.Level4,
} as Rule;

export default rule;
