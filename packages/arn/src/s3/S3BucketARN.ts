import { CustomARN } from '../CustomARN';

export class S3BucketARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 's3');
  }

  static fromBucketName = (bucketName: string): S3BucketARN =>
    new S3BucketARN(bucketName);

  static fromPhysicalId = (physicalId: string): S3BucketARN =>
    this.fromBucketName(physicalId);
}
