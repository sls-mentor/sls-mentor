import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SESIdentityARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.ses);
  }

  static fromIdentityName = (identity: string): SESIdentityARN =>
    new SESIdentityARN(`identity/${identity}`);

  static fromPhysicalId = (physicalId: string): SESIdentityARN =>
    SESIdentityARN.fromIdentityName(physicalId);

  getIdentityName = (): string => {
    const identity = this.resource.split('/')[1];

    if (identity === undefined) {
      throw new Error('Invalid SES Identity ARN');
    }

    return identity;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.ses && arn.resource.startsWith('identity/');

  static fromCustomARN = (arn: CustomARN): SESIdentityARN => {
    if (!SESIdentityARN.is(arn)) {
      throw new Error('Invalid SES Identity ARN');
    }

    return new SESIdentityARN(arn.resource);
  };
}
