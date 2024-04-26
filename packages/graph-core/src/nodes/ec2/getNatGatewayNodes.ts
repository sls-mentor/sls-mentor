import { CustomARN, VpcNatGatewayARN } from '@sls-mentor/arn';
import { fetchNatGateways } from '@sls-mentor/aws-api';

import { NodeBase } from 'types/helpers';

export const getNatGatewayNodes = async (
  resources: {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[],
): Promise<
  Record<string, NodeBase<VpcNatGatewayARN, Record<string, never>>>
> => {
  const natGateways = await fetchNatGateways();

  return Object.fromEntries(
    resources
      .filter(
        (
          resource,
        ): resource is {
          arn: VpcNatGatewayARN;
          cloudformationStack?: string;
          tags: Record<string, string>;
        } => VpcNatGatewayARN.is(resource.arn),
      )
      .map(({ arn }) => {
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
              SubnetIds: [
                natGateways.find(
                  natGateway =>
                    natGateway.NatGatewayId === arn.getNatGatewayId(),
                )?.SubnetId ?? '',
              ],
              SecurityGroupIds: undefined,
              VpcId: natGateways.find(
                natGateway => natGateway.NatGatewayId === arn.getNatGatewayId(),
              )?.VpcId,
            },
          },
        ];
      }),
  );
};
