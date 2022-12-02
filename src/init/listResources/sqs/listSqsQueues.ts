import { paginateListQueues } from '@aws-sdk/client-sqs';
import { sqsCLient } from '../../../clients';
import { SqsQueueARN } from '../../../types';

export const listSqsQueues = async (): Promise<SqsQueueARN[]> => {
  const queueUrls: string[] = [];

  for await (const resources of paginateListQueues({ client: sqsCLient }, {})) {
    queueUrls.push(...(resources.QueueUrls ?? []));
  }

  return queueUrls.map(SqsQueueARN.fromQueueUrl);
};
