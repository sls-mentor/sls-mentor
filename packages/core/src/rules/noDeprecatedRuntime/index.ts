import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { DEPRECATED_RUNTIMES } from '../../constants';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

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

export const noDeprecatedRuntime: Rule = {
  ruleName: 'Lambda: No Deprecated Runtime',
  errorMessage: 'The following functions have deprecated runtime',
  run,
  fileName: 'noDeprecatedRuntime',
  categories: ['Stability', 'Security'],
  level: 4,
  service: 'Lambda',
  easyToFix: false,
  severity: 'high',
  stage: [Stage.dev, Stage.prod],
} as Rule;
