import { CustomARN } from '../CustomARN';

export class RdsClusterARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'rds');
  }

  static fromRdsClusterName = (rdsName: string): RdsClusterARN =>
    new RdsClusterARN(`cluster:${rdsName}`);

  getRdsName = (): string => {
    const rdsName = this.resource.split(':')[1];

    if (rdsName === undefined) {
      throw new Error('Invalid RDS Cluster ARN');
    }

    return rdsName;
  };
}
