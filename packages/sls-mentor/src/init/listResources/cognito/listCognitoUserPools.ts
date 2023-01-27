import {
  paginateListUserPools,
  UserPoolDescriptionType,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoIdpClient, CognitoUserPoolARN } from 'core';

export const listCognitoUserPools = async (): Promise<CognitoUserPoolARN[]> => {
  const userPools: UserPoolDescriptionType[] = [];

  for await (const resources of paginateListUserPools(
    { client: cognitoIdpClient },
    { MaxResults: 20 },
  )) {
    userPools.push(...(resources.UserPools ?? []));
  }

  return userPools
    .map(({ Id }) => Id)
    .filter((userPoolId): userPoolId is string => userPoolId !== undefined)
    .map(userPoolId => CognitoUserPoolARN.fromUserPoolId(userPoolId));
};
