import { CustomARN } from '../CustomARN';

export class CloudwatchLogGroupARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'logs');
  }

  static fromLogGroupName = (logGroupName: string): CloudwatchLogGroupARN =>
    new CloudwatchLogGroupARN(`log-group:${logGroupName}`);

  static fromPhysicalId = (physicalId: string): CloudwatchLogGroupARN =>
    CloudwatchLogGroupARN.fromLogGroupName(physicalId);
}
