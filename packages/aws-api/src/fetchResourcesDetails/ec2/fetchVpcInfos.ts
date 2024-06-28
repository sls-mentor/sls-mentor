import {
  DescribeRouteTablesCommand,
  DescribeSubnetsCommand,
  DescribeVpcsCommand,
  RouteTable,
  Tag,
} from '@aws-sdk/client-ec2';

import { ec2Client } from 'clients';

export type VpcInfo = {
  vpcId: string;
  cidrBlock: string;
  state: string;
  tags: Tag[];
};

export const fetchVpcs = async (): Promise<VpcInfo[]> => {
  const { Vpcs } = await ec2Client.send(new DescribeVpcsCommand({}));
  if (Vpcs === undefined) {
    return [];
  }

  return Vpcs.map(vpc => ({
    vpcId: vpc.VpcId ?? '',
    cidrBlock: vpc.CidrBlock ?? '',
    state: vpc.State ?? '',
    tags: vpc.Tags ?? [{ Key: '', Value: '' }],
  }));
};

type SubnetInfo = {
  subnetId: string;
  vpcId: string;
  availabilityZone: string;
  cidrBlock: string;
  state: string;
  tags: Tag[];
  arn: string;
};

type SubnetWithRouteTable = SubnetInfo & {
  subnetType: SubnetType;
};

enum SubnetType {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
  PRIVATE_WITH_NAT = 'Pravite with NAT',
}

const getSubnetType = (routeTable: RouteTable): SubnetType => {
  const routeWithOpenIp = routeTable.Routes?.find(
    route => route.DestinationCidrBlock === '0.0.0.0/0',
  );

  if (routeWithOpenIp === undefined) {
    return SubnetType.PRIVATE;
  }

  if (routeWithOpenIp.GatewayId !== undefined) {
    if (routeWithOpenIp.GatewayId.startsWith('igw-')) {
      return SubnetType.PUBLIC;
    } else {
      return SubnetType.PRIVATE;
    }
  }

  if (routeWithOpenIp.NatGatewayId !== undefined) {
    if (routeWithOpenIp.NatGatewayId.startsWith('nat-')) {
      return SubnetType.PRIVATE_WITH_NAT;
    } else {
      return SubnetType.PRIVATE;
    }
  }

  return SubnetType.PRIVATE;
};

const getSubnetWithRouteTable = ({
  subnet,
  routeTables,
}: {
  subnet: SubnetInfo;
  routeTables: RouteTable[];
}): SubnetWithRouteTable => {
  const routeTableForSubnet = routeTables.find(
    routeTable =>
      routeTable.Associations?.find(
        association => association.SubnetId === subnet.subnetId,
      ),
  );

  if (routeTableForSubnet !== undefined) {
    return {
      ...subnet,
      subnetType: getSubnetType(routeTableForSubnet),
    };
  }

  const routeTableForVpc = routeTables.find(
    routeTable =>
      routeTable.VpcId === subnet.vpcId &&
      routeTable.Associations?.find(association => association.Main),
  );

  if (routeTableForVpc !== undefined) {
    return {
      ...subnet,
      subnetType: getSubnetType(routeTableForVpc),
    };
  }

  return {
    ...subnet,
    subnetType: SubnetType.PRIVATE,
  };
};

export const fetchSubnetGroups = async (): Promise<SubnetWithRouteTable[]> => {
  const { Subnets } = await ec2Client.send(new DescribeSubnetsCommand({}));
  if (Subnets === undefined) {
    return [];
  }

  const { RouteTables } = await ec2Client.send(
    new DescribeRouteTablesCommand({}),
  );

  const subnetsInfo = Subnets.map(subnet => ({
    subnetId: subnet.SubnetId ?? '',
    vpcId: subnet.VpcId ?? '',
    availabilityZone: subnet.AvailabilityZone ?? '',
    cidrBlock: subnet.CidrBlock ?? '',
    state: subnet.State ?? '',
    tags: subnet.Tags ?? [{ Key: '', Value: '' }],
    arn: subnet.SubnetArn ?? '',
  }));

  return subnetsInfo.map(subnet =>
    getSubnetWithRouteTable({
      subnet: subnet,
      routeTables: RouteTables ?? [],
    }),
  );
};
