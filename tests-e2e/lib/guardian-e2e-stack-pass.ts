import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export const PASS_INTELLIGENT_TIERING_BUCKET_NAME =
  'PassIntelligentTieringBucket';

export class GuardianE2EStackPass extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new s3.Bucket(this, PASS_INTELLIGENT_TIERING_BUCKET_NAME, {
      intelligentTieringConfigurations: [
        {
          name: 'intelligentTiering',
          archiveAccessTierTime: Duration.days(90),
          deepArchiveAccessTierTime: Duration.days(180),
        },
      ],
    });
  }
}
