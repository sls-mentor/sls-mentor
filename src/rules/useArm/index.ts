import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';
import { RuleNames } from '../../types/RuleNames';

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
  ruleName: RuleNames.NO_ARM_ARCHITECTURE,
  errorMessage:
    "The function's architecture is not set as ARM. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/use-arm/use-arm.md) for impact and how to to resolve.",
  run,
} as Rule;
