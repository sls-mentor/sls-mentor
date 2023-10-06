import { QueueEncryption, QueueProps } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

import { encryptedSqsQueues as EncryptedSqsQueuesRule } from '@sls-mentor/rules';

import { DefaultSqsQueue } from '../defaultConstructs';

type EncryptedSqsQueuesProps = Pick<QueueProps, 'encryption'>;

export class EncryptedSqsQueues extends Construct {
  static passTestCases: Record<string, EncryptedSqsQueuesProps> = {
    'SQS managed encryption': { encryption: QueueEncryption.SQS_MANAGED },
  };

  static failTestCases: Record<string, EncryptedSqsQueuesProps> = {
    'SQS not encrypted': { encryption: QueueEncryption.UNENCRYPTED },
  };

  constructor(
    scope: Construct,
    id: string,
    { encryption }: EncryptedSqsQueuesProps,
  ) {
    super(scope, id);
    const sqsQueue = new DefaultSqsQueue(this, 'EncryptedSqsQueues', {
      encryption,
    });
    sqsQueue.tagRule(EncryptedSqsQueuesRule);
  }
}
