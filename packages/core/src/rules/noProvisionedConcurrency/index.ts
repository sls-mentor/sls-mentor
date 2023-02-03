import { ProvisionedConcurrencyConfigListItem } from '@aws-sdk/client-lambda';
import { fetchAllLambdaProvisionedConcurrency } from '../../aws-sdk-helpers';
import { SlsMentorLevel } from '../../constants';
import { Category, Rule } from '../../types';

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

const rule: Rule = {
  ruleName: 'Lambda: No Provisioned Concurrency',
  errorMessage: 'The following functions have provisioned concurrency',
  run,
  fileName: 'noProvisionedConcurrency',
  level: SlsMentorLevel.Level3,
  categories: [Category.GREEN_IT, Category.IT_COSTS],
} as Rule;

export default rule;
