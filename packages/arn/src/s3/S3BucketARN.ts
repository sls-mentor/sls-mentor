import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class S3BucketARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.s3);
  }

  static fromBucketName = (bucketName: string): S3BucketARN =>
    new S3BucketARN(bucketName);

  static fromPhysicalId = (physicalId: string): S3BucketARN =>
    this.fromBucketName(physicalId);

  getBucketName = (): string => {
    const bucketName = this.resource;

    return bucketName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.s3 &&
    !arn.resource.includes(':') &&
    !arn.resource.includes('/');

  static fromCustomARN = (arn: CustomARN): S3BucketARN => {
    if (!S3BucketARN.is(arn)) {
      throw new Error('Invalid S3 Bucket ARN');
    }

    return new S3BucketARN(arn.resource);
  };
}
