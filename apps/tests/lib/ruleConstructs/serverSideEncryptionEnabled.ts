import { serverSideEncryptionEnabled as ServerSideEncryptionEnabledRule } from '@sls-mentor/core';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { DefaultBucket } from '../common';

interface ServerSideEncryptionEnabledProps {
  encryption: BucketEncryption;
}

export class ServerSideEncryptionEnabled extends Construct {
  static passTestCases: Record<string, ServerSideEncryptionEnabledProps> = {
    'S3 managed encryption': { encryption: BucketEncryption.S3_MANAGED },
    'KMS managed encryption': { encryption: BucketEncryption.KMS },
  };

  static failTestCases: Record<string, ServerSideEncryptionEnabledProps> = {
    'S3 unencrypted': { encryption: BucketEncryption.UNENCRYPTED },
  };

  constructor(
    scope: Construct,
    id: string,
    { encryption }: ServerSideEncryptionEnabledProps,
  ) {
    super(scope, id);
    const s3Bucket = new DefaultBucket(this, 'S3Bucket', {
      encryption,
    });
    s3Bucket.tagRule(ServerSideEncryptionEnabledRule);
  }
}
