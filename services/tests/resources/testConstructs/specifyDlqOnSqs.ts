import { Construct } from 'constructs';

import { specifyDlqOnSqs as SpecifyDlqOnSqsRule } from '@sls-mentor/rules';

import { DefaultSqsQueue } from '../defaultConstructs';

interface SpecifyDlqOnSQSProps {
  shouldUseDeadLetterQueue: boolean;
}

export class SpecifyDlqOnSQS extends Construct {
  static passTestCases: Record<string, SpecifyDlqOnSQSProps> = {
    'SQS with DLQ': {
      shouldUseDeadLetterQueue: true,
    },
  };

  static failTestCases: Record<string, SpecifyDlqOnSQSProps> = {
    'SQS without DLQ': { shouldUseDeadLetterQueue: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { shouldUseDeadLetterQueue }: SpecifyDlqOnSQSProps,
  ) {
    super(scope, id);
    const sqs = new DefaultSqsQueue(
      scope,
      'sqsQueue',
      shouldUseDeadLetterQueue ? {} : { deadLetterQueue: undefined },
    );

    sqs.tagRule(SpecifyDlqOnSqsRule);
  }
}
