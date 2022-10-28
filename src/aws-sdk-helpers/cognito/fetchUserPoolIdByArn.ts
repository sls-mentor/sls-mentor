import { paginateListUserPools } from '@aws-sdk/client-cognito-identity-provider';
import { ARN } from '@aws-sdk/util-arn-parser';
import { cognitoIdpClient } from '../../clients';

const fetchUserPoolIdByArn = async (arn: ARN): Promise<string | null> => {
  for await (const { UserPools } of paginateListUserPools(
    { client: cognitoIdpClient },
    { MaxResults: undefined },
  )) {
    const matchingUserPool = UserPools?.find(
      userPool => userPool.Id === userPoolIdFromArn(arn),
    );

    const matchingUserPoolId = matchingUserPool?.Id;
    if (matchingUserPoolId !== undefined) {
      return matchingUserPoolId;
    }
  }

  return null;
};

const userPoolIdFromArn = (arn: ARN) => {
  const matched = arn.resource.match(/^userpool\/(.*)$/);
  if (matched === null) {
    return null;
  }

  return matched[1];
};

export default fetchUserPoolIdByArn;
