import {
  DescribeUserPoolCommand,
  UserPoolType,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoIdpClient } from '../../clients';

const fetchUserPoolConfiguration = async (
  userPoolId: string,
): Promise<UserPoolType | undefined> => {
  const { UserPool } = await cognitoIdpClient.send(
    new DescribeUserPoolCommand({ UserPoolId: userPoolId }),
  );

  return UserPool;
};

export default fetchUserPoolConfiguration;
