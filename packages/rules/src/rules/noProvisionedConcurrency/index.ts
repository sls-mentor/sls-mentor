import { fetchAllLambdaProvisionedConcurrency } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const hasNoProvisionedConcurrency = (
  provisionedConcurrency: Awaited<
    ReturnType<typeof fetchAllLambdaProvisionedConcurrency>
  >[number]['provisionedConcurrency'],
) => provisionedConcurrency.length === 0;

const run: Rule['run'] = async resourceArns => {
  const lambdaProvisionedConcurrencies =
    await fetchAllLambdaProvisionedConcurrency(resourceArns);
  const results = lambdaProvisionedConcurrencies.map(
    ({ arn, provisionedConcurrency }) => ({
      arn,
      success: hasNoProvisionedConcurrency(provisionedConcurrency),
    }),
  );

  return { results };
};

export const noProvisionedConcurrency: Rule = {
  ruleName: 'Lambda: No Provisioned Concurrency',
  errorMessage: 'The following functions have provisioned concurrency',
  run,
  fileName: 'noProvisionedConcurrency',
  level: 3,
  stages: [Stage.prod, Stage.dev],
  categories: ['GreenIT', 'ITCosts'],
  service: 'Lambda',
  easyToFix: false,
  severity: 'medium',
} as Rule;
