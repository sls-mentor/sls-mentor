import { DescribeNatGatewaysCommand } from '@aws-sdk/client-ec2';

import { VpcNatGatewayARN } from '@sls-mentor/arn';

import { ec2Client } from 'clients';

export const listNatGateways = async (): Promise<VpcNatGatewayARN[]> => {
  const { NatGateways: natGatewaysList } = await ec2Client.send(
    new DescribeNatGatewaysCommand({}),
  );
  if (natGatewaysList === undefined) {
    return [];
  }

  return natGatewaysList.map(natgateway =>
    VpcNatGatewayARN.fromNatGatewayId(natgateway.NatGatewayId ?? ''),
  );
};
