import { CustomARN } from '../CustomARN';

export class RdsInstanceARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'rds');
  }

  static fromRdsInstanceName = (rdsName: string): RdsInstanceARN =>
    new RdsInstanceARN(`db:${rdsName}`);

  getRdsName = (): string => this.resource.split(':')[1];
}
