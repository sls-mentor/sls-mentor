import { ProvisionedConcurrencyConfigListItem } from '@aws-sdk/client-lambda';
import { fetchAllLambdaProvisionedConcurrency } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

const hasNoProvisionedConcurrency = (
  provisionedConcurrency: ProvisionedConcurrencyConfigListItem[],
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
  categories: ['GreenIT', 'ITCosts'],
  service: 'Lambda',
  easyToFix: false,
  severity: 'medium',
  stage: [Stage.dev, Stage.prod],
} as Rule;
