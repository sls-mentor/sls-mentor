import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { noMaxTimeout as NoMaxTimeoutRule } from '@sls-mentor/rules';

import { DefaultFunction } from '../defaultConstructs';

interface NoMaxTimeoutProps {
  timeout?: Duration;
}

export class NoMaxTimeout extends Construct {
  static passTestCases: Record<string, NoMaxTimeoutProps> = {
    'no max timeout set': {
      timeout: undefined,
    },
  };

  static failTestCases: Record<string, NoMaxTimeoutProps> = {
    'max timeout set to 10 min ': { timeout: Duration.seconds(900) },
  };

  constructor(scope: Construct, id: string, { timeout }: NoMaxTimeoutProps) {
    super(scope, id);
    const lambda = new DefaultFunction(this, 'LambdaFunction', {
      timeout,
    });
    lambda.tagRule(NoMaxTimeoutRule);
  }
}
