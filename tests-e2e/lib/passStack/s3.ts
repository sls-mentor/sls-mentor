import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export const PASS_INTELLIGENT_TIERING_BUCKET_NAME =
  'PassIntelligentTieringBucket';

export const setupS3 = (stack: cdk.Stack): void => {
  new s3.Bucket(stack, PASS_INTELLIGENT_TIERING_BUCKET_NAME, {
    intelligentTieringConfigurations: [
      {
        name: 'intelligentTiering',
        archiveAccessTierTime: Duration.days(90),
        deepArchiveAccessTierTime: Duration.days(180),
      },
    ],
  });
};
