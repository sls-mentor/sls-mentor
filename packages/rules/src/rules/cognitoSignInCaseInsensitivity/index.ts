import { fetchAllUserPoolConfigurations } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const hasCaseInsensitiveSignIn = (
  userPool: Awaited<
    ReturnType<typeof fetchAllUserPoolConfigurations>
  >[number]['configuration'],
): boolean => {
  return userPool.UsernameConfiguration?.CaseSensitive === false;
};

const run: Rule['run'] = async resourceArns => {
  const userPools = await fetchAllUserPoolConfigurations(resourceArns);

  const results = userPools.map(({ configuration, arn }) => ({
    arn,
    success: hasCaseInsensitiveSignIn(configuration),
  }));

  return { results };
};

export const cognitoSignInCaseInsensitivity: Rule = {
  ruleName: 'Cognito: use case insensitivity on the username input',
  errorMessage: 'The user pool is case sensitive on the username',
  run,
  fileName: 'cognitoSignInCaseInsensitivity',
  categories: ['Stability'],
  level: 5,
  service: 'Cognito',
  easyToFix: false,
  severity: 'low',
};
