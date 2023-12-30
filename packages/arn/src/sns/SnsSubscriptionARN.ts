import { parse } from '@aws-sdk/util-arn-parser';

import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SnsSubscriptionARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.sns);
  }

  static fromName = (name: string): SnsSubscriptionARN =>
    new SnsSubscriptionARN(name);

  static fromArnString = (arnString: string): SnsSubscriptionARN => {
    const parsedArn = parse(arnString);

    return new SnsSubscriptionARN(parsedArn.resource);
  };

  static fromPhysicalId = (physicalId: string): SnsSubscriptionARN =>
    SnsSubscriptionARN.fromArnString(physicalId);
}
