import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaTimeoutCompatibilityWithSqsVisibilityTimeout } from '../LambdaTimeoutCompatibilityWithSqsVisibilityTimeout';
import { setupLambda } from './lambda';
import { setupS3 } from './s3';

export class SlsMentorE2EStackFail extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    setupLambda(this);
    setupS3(this);
    new LambdaTimeoutCompatibilityWithSqsVisibilityTimeout(
      this,
      'LambdaTimeoutCompatibilityWithSqsVisibilityTimeout',
      {
        sqsVisibilityTimeout: Duration.seconds(29),
        lambdaTimeout: Duration.seconds(5),
      },
    );
  }
}
