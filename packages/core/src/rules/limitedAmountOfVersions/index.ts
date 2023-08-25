import { fetchAllLambdaVersions } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

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

export const limitedAmountOfVersions: Rule = {
  ruleName: 'Lambda: Limited Amount of Versions',
  errorMessage:
    'The following functions have an amount of deployed versions greater than 3',
  run,
  fileName: 'limitedAmountOfVersions',
  categories: ['GreenIT', 'Stability'],
  level: 2,
  service: 'Lambda',
  easyToFix: true,
  severity: 'medium',
  stage: [Stage.dev, Stage.prod],
};
