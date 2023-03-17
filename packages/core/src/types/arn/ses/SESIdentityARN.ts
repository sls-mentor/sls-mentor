import { CustomARN } from '../CustomARN';

export class SESIdentityARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'ses');
  }
  static fromIdentityName = (identity: string): SESIdentityARN =>
    new SESIdentityARN(`identity/${identity}`);
  getIdentity = (): string => this.resource.split('/')[1];
}
