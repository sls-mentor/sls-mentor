import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class RdsClusterARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.rds);
  }

  static fromRdsClusterIdentifier = (
    clusterIdentifier: string,
  ): RdsClusterARN => new RdsClusterARN(`cluster:${clusterIdentifier}`);

  static fromPhysicalId = (physicalId: string): RdsClusterARN =>
    RdsClusterARN.fromRdsClusterIdentifier(physicalId);

  getClusterIdentifier = (): string => {
    const clusterIdentifier = this.resource.split(':')[1];

    if (clusterIdentifier === undefined) {
      throw new Error('Invalid RDS Cluster ARN');
    }

    return clusterIdentifier;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.rds && arn.resource.startsWith('cluster:');

  static fromCustomARN = (arn: CustomARN): RdsClusterARN => {
    if (!RdsClusterARN.is(arn)) {
      throw new Error('Invalid RDS Cluster ARN');
    }

    return new RdsClusterARN(arn.resource);
  };
}
