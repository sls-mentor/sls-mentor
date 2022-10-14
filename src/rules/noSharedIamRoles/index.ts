import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type NoSharedIamRolesRule = Rule<Configuration>;

const isLambdaRoleShared = (
  lambdaConfiguration: FunctionConfiguration,
  sharedRoles: (string | undefined)[],
) => sharedRoles.includes(lambdaConfiguration.Role);

const run: NoSharedIamRolesRule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
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

const rule: NoSharedIamRolesRule = {
  name: 'NO_SHARED_IAM_ROLES',
  displayName: 'Lambda: No Shared IAM Roles',
  errorMessage:
    'The following functions have roles used by 1 or more other functions',
  run,
  fileName: 'noSharedIamRoles',
  categories: [Category.SECURITY, Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
