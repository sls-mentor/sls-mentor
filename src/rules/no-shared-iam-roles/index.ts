import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';

const isLambdaRoleShared = (
  lambdaConfiguration: FunctionConfiguration,
  sharedRoles: (string | undefined)[],
) => sharedRoles.includes(lambdaConfiguration.Role);

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);
  const roles = lambdaConfigurations.map(
    lambdaConfiguration => lambdaConfiguration.Role,
  );
  const sharedRoles = roles.filter(
    role => roles.filter(r => r === role).length > 1,
  );
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !isLambdaRoleShared(lambdaConfiguration, sharedRoles),
    role: lambdaConfiguration.Role,
  }));

  return { results };
};

export default {
  ruleName: 'No IAM shared roles',
  errorMessage:
    'The following functions have roles used by 1 or more other functions.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-shared-roles) for impact and how to to resolve.',
  run,
} as Rule;
