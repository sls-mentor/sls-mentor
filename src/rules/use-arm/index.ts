import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';

const armArchitecture = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: FunctionConfiguration,
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === armArchitecture
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
  ruleName: 'Not using Arm Architecture',
  errorMessage:
    "The function's architecture is not set as ARM. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/use-arm/use-arm.md) for impact and how to to resolve.",
  run,
} as Rule;
