import type { Duration } from 'aws-cdk-lib';
import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

type LambdaTimeoutCompatibilityWithSqsVisibilityTimeoutProps = {
  sqsVisibilityTimeout: Duration;
  lambdaTimeout: Duration;
};

export class LambdaTimeoutCompatibilityWithSqsVisibilityTimeout extends Construct {
  constructor(
    scope: Construct,
    id: string,
    {
      sqsVisibilityTimeout,
      lambdaTimeout,
    }: LambdaTimeoutCompatibilityWithSqsVisibilityTimeoutProps,
  ) {
    super(scope, id);

    const queue = new Queue(this, 'Queue', {
      visibilityTimeout: sqsVisibilityTimeout,
    });

    const lambdaFunction = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_16_X,
      code: InlineCode.fromInline(
        'exports.handler = async () => { return "hello world" }',
      ),
      handler: 'index.handler',
      timeout: lambdaTimeout,
    });

    lambdaFunction.addEventSource(new SqsEventSource(queue));
  }
}
