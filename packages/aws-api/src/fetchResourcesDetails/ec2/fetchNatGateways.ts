import { DescribeNatGatewaysCommand, NatGateway } from '@aws-sdk/client-ec2';

import { ec2Client } from 'clients';

export const fetchNatGateways = async (): Promise<NatGateway[]> => {
  const { NatGateways: natGatewaysList } = await ec2Client.send(
    new DescribeNatGatewaysCommand({}),
  );
  if (natGatewaysList === undefined) {
    return [];
  }

  return natGatewaysList;
};
