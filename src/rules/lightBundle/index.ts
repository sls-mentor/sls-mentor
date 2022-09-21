import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { Rule, Rules } from '../../types';

const hasHeavyBundle = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.CodeSize !== undefined &&
  lambdaConfiguration.CodeSize > 5000000;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasHeavyBundle(lambdaConfiguration),
    bundleSize: lambdaConfiguration.CodeSize,
  }));

  return { results };
};

const rule: Rule = {
  run,
  rule: Rules.LIGHT_BUNDLE,
};

export default rule;
