import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SqsQueueARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.sqs);
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

  getQueueName = (): string => {
    const queueName = this.resource;

    return queueName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.sqs &&
    !arn.resource.includes(':') &&
    !arn.resource.includes('/');

  static fromCustomARN = (arn: CustomARN): SqsQueueARN => {
    if (!SqsQueueARN.is(arn)) {
      throw new Error('Invalid SQS Queue ARN');
    }

    return new SqsQueueARN(arn.resource);
  };
}
