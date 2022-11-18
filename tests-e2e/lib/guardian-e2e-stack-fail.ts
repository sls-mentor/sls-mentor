import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export const FAIL_INTELLIGENT_TIERING_BUCKET_NAME =
  'FailIntelligentTieringBucket';

export class GuardianE2EStackFail extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new s3.Bucket(this, FAIL_INTELLIGENT_TIERING_BUCKET_NAME);
  }
}
