import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { Category, Rule } from '../../types';

const isLambdaRoleShared = (
  lambdaConfiguration: FunctionConfiguration,
  sharedRoles: (string | undefined)[],
) => sharedRoles.includes(lambdaConfiguration.Role);

const run: Rule['run'] = async resourceArns => {
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

const rule: Rule = {
  displayName: 'Lambda: No Shared IAM Roles',
  errorMessage:
    'The following functions have roles used by 1 or more other functions',
  run,
  fileName: 'noSharedIamRoles',
  categories: [Category.SECURITY, Category.STABILITY],
};

export default rule;
