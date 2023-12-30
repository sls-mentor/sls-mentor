import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class RdsInstanceARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.rds);
  }

  static fromRdsInstanceName = (rdsName: string): RdsInstanceARN =>
    new RdsInstanceARN(`db:${rdsName}`);

  static fromPhysicalId = (physicalId: string): RdsInstanceARN =>
    RdsInstanceARN.fromRdsInstanceName(physicalId);

  getRdsName = (): string => {
    const rdsName = this.resource.split(':')[1];

    if (rdsName === undefined) {
      throw new Error('Invalid RDS Instance ARN');
    }

    return rdsName;
  };
}
