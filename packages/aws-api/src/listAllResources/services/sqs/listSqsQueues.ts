import { paginateListQueues } from '@aws-sdk/client-sqs';

import { SqsQueueARN } from '@sls-mentor/arn';

import { sqsClient } from 'clients';

export const listSqsQueues = async (): Promise<SqsQueueARN[]> => {
  const queueUrls: string[] = [];

  for await (const resources of paginateListQueues({ client: sqsClient }, {})) {
    queueUrls.push(...(resources.QueueUrls ?? []));
  }

  return queueUrls.map(SqsQueueARN.fromQueueUrl);
};
