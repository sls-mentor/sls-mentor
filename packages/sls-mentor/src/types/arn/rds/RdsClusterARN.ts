import { CustomARN } from '../CustomARN';

export class RdsClusterARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'rds');
  }

  static fromRdsClusterName = (rdsName: string): RdsClusterARN =>
    new RdsClusterARN(`cluster:${rdsName}`);

  getRdsName = (): string => this.resource.split(':')[1];
}
