import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class CloudFrontDistributionARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.cloudfront);
  }

  static fromDistributionId = (
    distributionId: string,
  ): CloudFrontDistributionARN =>
    new CloudFrontDistributionARN(`distribution/${distributionId}`);

  static fromPhysicalId = (physicalId: string): CloudFrontDistributionARN =>
    CloudFrontDistributionARN.fromDistributionId(physicalId);

  getDistributionId = (): string => {
    const distributionId = this.resource.split('/')[1];

    if (distributionId === undefined) {
      throw new Error('Invalid CloudFront Distribution ARN');
    }

    return distributionId;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.cloudfront &&
    arn.resource.startsWith('distribution/');

  static fromCustomARN = (arn: CustomARN): CloudFrontDistributionARN => {
    if (!CloudFrontDistributionARN.is(arn)) {
      throw new Error('Invalid CloudFront Distribution ARN');
    }

    return new CloudFrontDistributionARN(arn.resource);
  };
}
