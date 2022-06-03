import { fetchAllLambdaVersions } from '../../helpers';
import { CheckResult, Resource, Rule, RuleNames } from '../../types';

const MAX_NUMBER_OF_VERSIONS = 3 + 1; // +$latest

const run = async (
  resources: Resource[],
): Promise<{ results: CheckResult[] }> => {
  const lambdaVersions = await fetchAllLambdaVersions(resources);

  const results = lambdaVersions.map(({ arn, versions }) => ({
    arn,
    success: versions.length <= MAX_NUMBER_OF_VERSIONS,
    versionNumber: versions.length,
  }));

  return { results };
};

export default {
  ruleName: RuleNames.LIMITED_NUMBER_OF_LAMBDA_VERSIONS,
  errorMessage:
    'The following functions have a number of deployed versions greater than 3',
  run,
} as Rule;
