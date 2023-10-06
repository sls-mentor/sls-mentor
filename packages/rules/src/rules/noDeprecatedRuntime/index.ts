import { fetchAllLambdaConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const DEPRECATED_RUNTIMES = [
  'python3.6',
  'python2.7',
  'dotnetcore2.1',
  'ruby2.5',
  'nodejs10.x',
  'nodejs8.10',
  'nodejs4.3',
  'nodejs6.10',
  'dotnetcore1.0',
  'dotnetcore2.0',
  'nodejs4.3-edge',
  'nodejs',
];

const hasDeprecatedRuntime = (
  lambdaConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
) =>
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
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: false,
  severity: 'high',
} as Rule;
