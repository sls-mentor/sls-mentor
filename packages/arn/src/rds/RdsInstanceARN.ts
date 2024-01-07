import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class RdsInstanceARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.rds);
  }

  static fromRdsInstanceIdentifier = (
    instanceIdentifier: string,
  ): RdsInstanceARN => new RdsInstanceARN(`db:${instanceIdentifier}`);

  static fromPhysicalId = (physicalId: string): RdsInstanceARN =>
    RdsInstanceARN.fromRdsInstanceIdentifier(physicalId);

  getInstanceIdentifier = (): string => {
    const instanceIdentifier = this.resource.split(':')[1];

    if (instanceIdentifier === undefined) {
      throw new Error('Invalid RDS Instance ARN');
    }

    return instanceIdentifier;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.rds && arn.resource.startsWith('db:');

  static fromCustomARN = (arn: CustomARN): RdsInstanceARN => {
    if (!RdsInstanceARN.is(arn)) {
      throw new Error('Invalid RDS Instance ARN');
    }

    return new RdsInstanceARN(arn.resource);
  };
}
