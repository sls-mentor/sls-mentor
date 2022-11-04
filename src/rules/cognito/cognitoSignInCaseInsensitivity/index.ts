import { UserPoolType } from '@aws-sdk/client-cognito-identity-provider';
import { fetchUserPoolIdByArn } from '../../../aws-sdk-helpers/cognito';
import fetchUserPoolConfiguration from '../../../aws-sdk-helpers/cognito/fetchUserPoolConfiguration';
import filterServiceFromResourceArns from '../../../aws-sdk-helpers/common/filterServiceFromResourceArns';
import { Category, Rule } from '../../../types';

const run: Rule['run'] = async resourceArns => {
  const userPoolsArns = filterServiceFromResourceArns(
    resourceArns,
    'cognito-idp',
  );

  const userPoolsIds = await Promise.all(
    userPoolsArns.map(fetchUserPoolIdByArn),
  );

  const existingUserPoolsIds = userPoolsIds.filter(
    (id): id is string => id !== null,
  );

  const userPools = await Promise.all(
    existingUserPoolsIds.map(fetchUserPoolConfiguration),
  );

  const results = userPools.map(userPool => ({
    arn: userPool?.Arn ?? '',
    success: hasCaseInsensitiveSignIn(userPool),
  }));

  return { results };
};

const hasCaseInsensitiveSignIn = (userPool?: UserPoolType) => {
  return userPool?.UsernameConfiguration?.CaseSensitive === false;
};

const rule: Rule = {
  ruleName: 'Cognito: use case insensitivity on the username input',
  errorMessage: 'The user pool is case sensitive on the username',
  run,
  fileName: 'cognitoSignInCaseInsensitivity',
  categories: [Category.STABILITY],
};

export default rule;
