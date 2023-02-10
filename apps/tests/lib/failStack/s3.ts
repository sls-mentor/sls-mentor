import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export const FAIL_INTELLIGENT_TIERING_BUCKET_NAME =
  'FailIntelligentTieringBucket';

export const FAIL_SSE_ENABLED_BUCKET_NAME = 'FailSseEnabled';

export const setupS3 = (stack: cdk.Stack): void => {
  new s3.Bucket(stack, FAIL_INTELLIGENT_TIERING_BUCKET_NAME);
  new s3.Bucket(stack, FAIL_SSE_ENABLED_BUCKET_NAME);
};
