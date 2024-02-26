import { fetchAllLambdaConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const isLambdaRoleShared = (
  lambdaConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
  sharedRoles: (string | undefined)[],
) => sharedRoles.includes(lambdaConfiguration.Role);

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const roles = lambdaConfigurations.map(
    ({ configuration }) => configuration.Role,
  );
  const sharedRoles = roles.filter(
    role => roles.filter(r => r === role).length > 1,
  );
  const results = lambdaConfigurations.map(({ configuration, arn }) => ({
    arn,
    success: !isLambdaRoleShared(configuration, sharedRoles),
    role: configuration.Role,
  }));

  return { results };
};

export const noSharedIamRoles: Rule = {
  ruleName: 'Lambda: No Shared IAM Roles',
  errorMessage:
    'The following functions have roles used by 1 or more other functions',
  run,
  fileName: 'noSharedIamRoles',
  categories: ['Security', 'Stability'],
  level: 4,
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: false,
  severity: 'critical',
};
