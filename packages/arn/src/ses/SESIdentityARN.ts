import { CustomARN } from '../CustomARN';

export class SESIdentityARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'ses');
  }

  static fromIdentityName = (identity: string): SESIdentityARN =>
    new SESIdentityARN(`identity/${identity}`);

  static fromPhysicalId = (physicalId: string): SESIdentityARN =>
    SESIdentityARN.fromIdentityName(physicalId);

  getIdentity = (): string => {
    const identity = this.resource.split('/')[1];

    if (identity === undefined) {
      throw new Error('Invalid SES Identity ARN');
    }

    return identity;
  };
}
