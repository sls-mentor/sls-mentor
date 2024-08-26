import {
  paginateListUserPools,
  UserPoolDescriptionType,
} from '@aws-sdk/client-cognito-identity-provider';

import { CognitoUserPoolARN } from '@sls-mentor/arn';

import { cognitoIdpClient } from 'clients';

export const listCognitoUserPools = async (): Promise<CognitoUserPoolARN[]> => {
  const userPools: UserPoolDescriptionType[] = [];
  try {
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
  } catch (e) {
    console.log(
      'There was an issue while getting CognitoUserPools: ',
      {
        e,
      },
    );

    return [];
  }
};
