import { fetchAllLambdaConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const AWS_MAXIMUM_TIMEOUT = 900;

const hasMaximumTimeout = (
  lambdaConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
) =>
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
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: true,
  severity: 'high',
} as Rule;
