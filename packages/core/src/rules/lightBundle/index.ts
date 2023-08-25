import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

const hasHeavyBundle = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.CodeSize !== undefined &&
  lambdaConfiguration.CodeSize > 5000000;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: !hasHeavyBundle(configuration),
    bundleSize: configuration.CodeSize,
  }));

  return { results };
};

export const lightBundle: Rule = {
  ruleName: 'Lambda: Light Bundle',
  errorMessage:
    'The following functions have bundles that weight more than 5 Mb',
  run,
  fileName: 'lightBundle',
  categories: ['GreenIT', 'Stability'],
  level: 4,
  service: 'Lambda',
  easyToFix: false,
  severity: 'critical',
  stage: [Stage.dev, Stage.prod],
};
