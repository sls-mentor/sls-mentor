import { CustomARN } from '../CustomARN';

export class CloudFrontDistributionARN extends CustomARN {
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
