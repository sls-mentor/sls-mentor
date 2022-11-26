import { GuardianARN } from '../GuardianARN';

export class SqsQueueARN extends GuardianARN {
  constructor(resource: string) {
    super(resource, 'sqs');
  }

  static fromQueueUrl = (queueUrl: string): SqsQueueARN => {
    const splitQueueUrl = queueUrl.split('/');
    const queueName = splitQueueUrl.pop();

    if (queueName === undefined) {
      throw new Error(`Error while retrieving sqs queue name of ${queueUrl}`);
    }

    return new SqsQueueARN(queueName);
  };

  static fromPhysicalId = (physicalId: string): SqsQueueARN =>
    SqsQueueARN.fromQueueUrl(physicalId);
}
