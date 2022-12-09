import { GuardianARN } from '../GuardianARN';

export class CloudFrontDistributionARN extends GuardianARN {
  constructor(resource: string) {
    super(resource, 'cloudfront');
  }

  static fromDistributionId = (
    distributionId: string,
  ): CloudFrontDistributionARN =>
    new CloudFrontDistributionARN(`distribution/${distributionId}`);

  static fromPhysicalId = (physicalId: string): CloudFrontDistributionARN =>
    CloudFrontDistributionARN.fromDistributionId(physicalId);

  getDistributionId = (): string => this.resource.split('/')[1];
}
