import { Construct } from 'constructs';
import { DefaultSqsQueue } from '../../../tests/constructs';
import { DefaultSnsSubscription } from '../../../tests/constructs/defaultSnsSubscription';
import { snsRedrivePolicy as SnsRedrivePolicyRule } from './index';

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
          ? new DefaultSqsQueue(scope, `${id}-queue`)
          : undefined,
      },
    );
    snsSubscription.tagRule(SnsRedrivePolicyRule);
  }
}
