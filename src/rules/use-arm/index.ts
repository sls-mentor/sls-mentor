import {
  GetFunctionConfigurationCommand,
  GetFunctionConfigurationCommandOutput,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { ARN } from '@aws-sdk/util-arn-parser';
import { Rule } from '../..';

type CheckRuleOnResourceReturnType = {
  arn: string;
  success: boolean;
} & Record<string, unknown>;

const armArchitecture = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: GetFunctionConfigurationCommandOutput,
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === armArchitecture
    : false;

const run = async (
  resources: { arn: ARN }[],
): Promise<{
  results: CheckRuleOnResourceReturnType[];
}> => {
  const client = new LambdaClient({});
  const lambdasNames = resources
    .filter(({ arn }) => arn.service === 'lambda')
    .map(({ arn }) => arn.resource);

  const lambdasConfigurations = await Promise.all(
    lambdasNames.map(FunctionName =>
      client.send(new GetFunctionConfigurationCommand({ FunctionName })),
    ),
  );
  const results = lambdasConfigurations.map(lambdaConfigurations => ({
    arn: lambdaConfigurations.FunctionArn ?? '',
    success: isArmArchitecture(lambdaConfigurations),
  }));

  return { results };
};

export default {
  ruleName: 'Not using Arm Architecture',
  errorMessage:
    "The function's architecture is not set as ARM. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/use-arm/use-arm.md) for impact and how to to resolve.",
  run,
} as Rule;
