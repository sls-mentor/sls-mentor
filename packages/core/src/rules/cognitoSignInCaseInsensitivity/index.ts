import { UserPoolType } from '@aws-sdk/client-cognito-identity-provider';
import { fetchAllUserPoolConfigurations } from 'aws-sdk-helpers';
import { Rule } from 'types';

const hasCaseInsensitiveSignIn = (userPool: UserPoolType) => {
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
};
