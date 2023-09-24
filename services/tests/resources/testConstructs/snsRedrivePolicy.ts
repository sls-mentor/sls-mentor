import { Construct } from 'constructs';

import { snsRedrivePolicy as SnsRedrivePolicyRule } from '@sls-mentor/rules';

import { DefaultSnsSubscription, DefaultSqsQueue } from '../defaultConstructs';

interface SnsRedrivePolicyProps {
  hasDeadLetterQueue: boolean;
}

export class SnsRedrivePolicy extends Construct {
  static passTestCases: Record<string, SnsRedrivePolicyProps> = {
    'Subscription with dead letter queue': { hasDeadLetterQueue: true },
  };

  static failTestCases: Record<string, SnsRedrivePolicyProps> = {
    'Subscription without dead letter queue': { hasDeadLetterQueue: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { hasDeadLetterQueue }: SnsRedrivePolicyProps,
  ) {
    super(scope, id);
    const snsSubscription = new DefaultSnsSubscription(
      this,
      'SnsRedrivePolicy',
      {
        deadLetterQueue: hasDeadLetterQueue
          ? new DefaultSqsQueue(scope, 'snsRedrivePolicyDlq')
          : undefined,
      },
    );
    snsSubscription.tagRule(SnsRedrivePolicyRule);
  }
}
