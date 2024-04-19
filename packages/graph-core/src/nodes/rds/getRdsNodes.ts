import { CustomARN, RdsClusterARN } from '@sls-mentor/arn';
import {
  fetchAllRdsCluster,
  fetchRdsSubnetGroups,
  fetchSecurityGroups,
} from '@sls-mentor/aws-api';

import { NodeBase } from 'types/helpers';

type RdsNode = NodeBase<RdsClusterARN, Record<string, never>>;

export const getRDSNodes = async (
  resources: {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[],
): Promise<Record<string, RdsNode>> => {
  const rdsConfigurations = await fetchAllRdsCluster(
    resources.map(({ arn }) => arn),
  );

  const vpcSecurityGroupIds = (
    await Promise.all(
      rdsConfigurations.map(async ({ configuration }) => {
        if (configuration === undefined) {
          return [];
        }

        const securityGroups = await fetchSecurityGroups(
          configuration.VpcSecurityGroups?.map(
            ({ VpcSecurityGroupId }) => VpcSecurityGroupId ?? '',
          ) ?? [],
        );

        return securityGroups.map(({ VpcId, GroupId }) => ({
          vpcId: VpcId,
          securityGroupId: GroupId,
        }));
      }),
    )
  ).flat();

  const vpcSecurityGroupIdToVpcId = vpcSecurityGroupIds.reduce(
    (
      acc: Record<string, string>,
      item: { securityGroupId?: string; vpcId?: string },
    ) => {
      if (item.securityGroupId === undefined || item.vpcId === undefined) {
        return acc;
      }

      acc[item.securityGroupId] = item.vpcId;

      return acc;
    },
    {},
  );

  return Object.fromEntries(
    await Promise.all(
      rdsConfigurations.map(async ({ arn, configuration }) => {
        const subnetGroup = await fetchRdsSubnetGroups(
          configuration?.DBSubnetGroup ?? '',
        );

        return [
          arn.toString(),
          {
            arn,
            stats: {},
            cloudformationStack: resources.find(resource =>
              resource.arn.is(arn),
            )?.cloudformationStack,
            tags: resources.find(resource => resource.arn.is(arn))?.tags ?? {},
            vpcConfig: {
              SubnetIds: subnetGroup.flatMap(({ Subnets }) =>
                (Subnets ?? []).map(s => s.SubnetIdentifier ?? ''),
              ),
              SecurityGroupIds: configuration?.VpcSecurityGroups?.map(
                ({ VpcSecurityGroupId }) => VpcSecurityGroupId ?? '',
              ),
              VpcId:
                vpcSecurityGroupIdToVpcId[
                  configuration?.VpcSecurityGroups?.[0]?.VpcSecurityGroupId ??
                    ''
                ] ?? '',
            },
          },
        ] as [string, NodeBase<RdsClusterARN, Record<string, never>>];
      }),
    ),
  );
};
