import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class VpcNatGatewayARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.ec2);
  }

  static fromPhysicalId = (physicalId: string): VpcNatGatewayARN => {
    return this.fromNatGatewayId(physicalId);
  };

  static fromNatGatewayId = (natGatewayId: string): VpcNatGatewayARN =>
    new VpcNatGatewayARN(`natgateway/${natGatewayId}`);

  getNatGatewayId = (): string => {
    const natGatewayId = this.resource.split('/')[1];

    if (natGatewayId === undefined) {
      throw new Error('Invalid NatGateway ARN');
    }

    return natGatewayId;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.ec2 && arn.resource.startsWith('natgateway/');

  static fromCustomARN = (arn: CustomARN): VpcNatGatewayARN => {
    if (!VpcNatGatewayARN.is(arn)) {
      throw new Error('Invalid VPC NatGateway ARN');
    }

    return new VpcNatGatewayARN(arn.resource);
  };
}
