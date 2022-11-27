import {
  DescribeUserPoolCommand,
  UserPoolType,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoIdpClient } from '../../clients';
import { CognitoUserPoolARN, GuardianARN } from '../../types';

const fetchUserPoolConfiguration = async (
  userPoolId: string,
): Promise<UserPoolType | undefined> => {
  const { UserPool } = await cognitoIdpClient.send(
    new DescribeUserPoolCommand({ UserPoolId: userPoolId }),
  );

  return UserPool;
};

export const fetchAllUserPoolConfigurations = async (
  resourceArns: GuardianARN[],
): Promise<
  {
    arn: CognitoUserPoolARN;
    configuration: UserPoolType;
  }[]
> => {
  const userPoolIds = GuardianARN.filterArns(
    resourceArns,
    CognitoUserPoolARN,
  ).map(arn => arn.getUserPoolId());

  const userPoolsConfigurations = await Promise.all(
    userPoolIds.map(fetchUserPoolConfiguration),
  );

  return userPoolsConfigurations
    .filter(
      (configuration): configuration is UserPoolType =>
        configuration !== undefined,
    )
    .map(configuration => ({
      configuration,
      arn: CognitoUserPoolARN.fromUserPoolId(configuration.Id ?? ''),
    }));
};
