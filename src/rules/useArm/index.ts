import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

const ARM_ARCHITECTURE = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: FunctionConfiguration,
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === ARM_ARCHITECTURE
    : false;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: isArmArchitecture(lambdaConfiguration),
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.NO_ARM_ARCHITECTURE,
  errorMessage: ErrorMessages.NO_ARM_ARCHITECTURE,
  run,
} as Rule;
