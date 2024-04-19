import {
  DescribeSecurityGroupsCommand,
  SecurityGroup,
} from '@aws-sdk/client-ec2';

import { ec2Client } from 'clients';

export const fetchSecurityGroups = async (
  securityGroupIds: string[],
): Promise<SecurityGroup[]> => {
  const { SecurityGroups: securityGroupsList } = await ec2Client.send(
    new DescribeSecurityGroupsCommand({ GroupIds: securityGroupIds }),
  );
  if (securityGroupsList === undefined) {
    return [];
  }

  return securityGroupsList;
};
