import { parse } from '@aws-sdk/util-arn-parser';

import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SnsSubscriptionARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.sns);
  }

  static fromSubscriptionArn = (arnString: string): SnsSubscriptionARN => {
    const parsedArn = parse(arnString);

    return new SnsSubscriptionARN(parsedArn.resource);
  };

  static fromPhysicalId = (physicalId: string): SnsSubscriptionARN =>
    SnsSubscriptionARN.fromSubscriptionArn(physicalId);

  getSubscriptionArn = (): string => this.toString();

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.sns &&
    arn.resource.includes(':') &&
    !arn.resource.includes('/');

  static fromCustomARN = (arn: CustomARN): SnsSubscriptionARN => {
    if (!SnsSubscriptionARN.is(arn)) {
      throw new Error('Invalid SNS Subscription ARN');
    }

    return new SnsSubscriptionARN(arn.resource);
  };
}
