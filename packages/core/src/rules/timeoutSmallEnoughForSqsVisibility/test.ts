import { Duration } from 'aws-cdk-lib';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';
import { DefaultFunction, DefaultSqsQueue } from '../../../tests/constructs';
import { timeoutSmallEnoughForSqsVisibility as TimeoutSmallEnoughForSqsVisibilityRule } from './index';

interface TimeoutSmallEnoughForSqsVisibilityProps {
  lambdaTimeout: Duration;
  sqs1VisibilityTimeout: Duration;
  sqs2VisibilityTimeout: Duration;
}

export class TimeoutSmallEnoughForSqsVisibility extends Construct {
  static passTestCases: Record<
    string,
    TimeoutSmallEnoughForSqsVisibilityProps
  > = {
    'lambda timeout is 6 times smaller than the shorter visibility timeout': {
      lambdaTimeout: Duration.seconds(10),
      sqs1VisibilityTimeout: Duration.seconds(60),
      sqs2VisibilityTimeout: Duration.seconds(80),
    },
  };

  static failTestCases: Record<
    string,
    TimeoutSmallEnoughForSqsVisibilityProps
  > = {
    'lambda timeout is almost equal to one of the sqs visibility timeouts': {
      lambdaTimeout: Duration.seconds(29),
      sqs1VisibilityTimeout: Duration.seconds(30),
      sqs2VisibilityTimeout: Duration.seconds(80),
    },
    'lambda timeout is equal to one of the the sqs visibility timeouts': {
      lambdaTimeout: Duration.seconds(30),
      sqs1VisibilityTimeout: Duration.seconds(30),
      sqs2VisibilityTimeout: Duration.seconds(80),
    },
  };

  constructor(
    scope: Construct,
    id: string,
    {
      lambdaTimeout,
      sqs1VisibilityTimeout,
      sqs2VisibilityTimeout,
    }: TimeoutSmallEnoughForSqsVisibilityProps,
  ) {
    super(scope, id);
    const queue1 = new DefaultSqsQueue(this, 'Queue1', {
      visibilityTimeout: sqs1VisibilityTimeout,
    });
    const eventSource1 = new SqsEventSource(queue1);
    const queue2 = new DefaultSqsQueue(this, 'Queue2', {
      visibilityTimeout: sqs2VisibilityTimeout,
    });
    const eventSource2 = new SqsEventSource(queue2);
    const lambda = new DefaultFunction(this, `LambdaFunction`, {
      timeout: lambdaTimeout,
    });
    lambda.addEventSource(eventSource1);
    lambda.addEventSource(eventSource2);
    lambda.tagRule(TimeoutSmallEnoughForSqsVisibilityRule);
  }
}
