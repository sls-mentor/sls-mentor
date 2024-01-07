import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class CloudwatchLogGroupARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.logs);
  }

  static fromLogGroupName = (logGroupName: string): CloudwatchLogGroupARN =>
    new CloudwatchLogGroupARN(`log-group:${logGroupName}`);

  static fromPhysicalId = (physicalId: string): CloudwatchLogGroupARN =>
    CloudwatchLogGroupARN.fromLogGroupName(physicalId);

  getLogGroupName = (): string => {
    const logGroupName = this.resource.split(':')[1];

    if (logGroupName === undefined) {
      throw new Error('Invalid Cloudwatch Log Group ARN');
    }

    return logGroupName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.logs && arn.resource.startsWith('log-group:');

  static fromCustomARN = (arn: CustomARN): CloudwatchLogGroupARN => {
    if (!CloudwatchLogGroupARN.is(arn)) {
      throw new Error('Invalid Cloudwatch Log Group ARN');
    }

    return new CloudwatchLogGroupARN(arn.resource);
  };
}
