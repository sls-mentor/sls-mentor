import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type LightBundleRule = Rule<Configuration>;

const hasHeavyBundle = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.CodeSize !== undefined &&
  lambdaConfiguration.CodeSize > 5000000;

const run: LightBundleRule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasHeavyBundle(lambdaConfiguration),
    bundleSize: lambdaConfiguration.CodeSize,
  }));

  return { results };
};

const rule: LightBundleRule = {
  name: 'LIGHT_BUNDLE',
  displayName: 'Lambda: Light Bundle',
  errorMessage:
    'The following functions have bundles that weight more than 5 Mb',
  run,
  fileName: 'lightBundle',
  categories: [Category.GREEN_IT, Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
