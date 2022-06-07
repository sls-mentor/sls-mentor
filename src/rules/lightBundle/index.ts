import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

const hasHeavyBundle = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.CodeSize !== undefined &&
  lambdaConfiguration.CodeSize > 5000000;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasHeavyBundle(lambdaConfiguration),
    bundleSize: lambdaConfiguration.CodeSize,
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.LIGHT_BUNDLE,
  errorMessage: ErrorMessages.LIGHT_BUNDLE,
  run,
} as Rule;
