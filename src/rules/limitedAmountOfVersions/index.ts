import { fetchAllLambdaVersions } from '../../helpers';
import { Rule, Rules } from '../../types';

const MAX_AMOUNT_OF_VERSIONS = 3 + 1; // +$latest

const run: Rule['run'] = async resourceArns => {
  const lambdaVersions = await fetchAllLambdaVersions(resourceArns);

  const results = lambdaVersions.map(({ arn, versions }) => ({
    arn,
    success: versions.length <= MAX_AMOUNT_OF_VERSIONS,
    versionAmount: versions.length,
  }));

  return { results };
};

const rule: Rule = {
  run,
  rule: Rules.LIMITED_AMOUNT_OF_LAMBDA_VERSIONS,
};

export default rule;
