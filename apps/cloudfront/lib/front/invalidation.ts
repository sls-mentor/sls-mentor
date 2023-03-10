import { Stack } from 'aws-cdk-lib';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import path from 'path';

export const setupInvalidation = (
  stack: Stack,
  bucket: Bucket,
  distribution: Distribution,
): void => {
  const invalidateCacheLambda = new NodejsFunction(stack, 'invalidateCache', {
    environment: {
      DISTRIBUTION_ID: distribution.distributionId,
    },
    entry: path.join(__dirname, 'invalidateCacheLambda', 'handler.ts'),
    handler: 'handler',
  });

  invalidateCacheLambda.addEventSource(
    new S3EventSource(bucket, {
      events: [EventType.OBJECT_CREATED],
    }),
  );

  invalidateCacheLambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['cloudfront:CreateInvalidation'],
      resources: ['*'],
    }),
  );
};
