import { parse } from '@aws-sdk/util-arn-parser';

import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SnsTopicARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.sns);
  }

  static fromTopicArn = (arnString: string): SnsTopicARN => {
    const parsedArn = parse(arnString);

    return new SnsTopicARN(parsedArn.resource);
  };

  static fromPhysicalId = (physicalId: string): SnsTopicARN =>
    SnsTopicARN.fromTopicArn(physicalId);

  getTopicArn = (): string => this.toString();

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.sns &&
    !arn.resource.includes(':') &&
    !arn.resource.includes('/');

  static fromCustomARN = (arn: CustomARN): SnsTopicARN => {
    if (!SnsTopicARN.is(arn)) {
      throw new Error('Invalid SNS Topic ARN');
    }

    return new SnsTopicARN(arn.resource);
  };
}
