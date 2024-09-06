import { paginateListQueues } from '@aws-sdk/client-sqs';

import { SqsQueueARN } from '@sls-mentor/arn';

import { sqsClient } from 'clients';

export const listSqsQueues = async (): Promise<SqsQueueARN[]> => {
  const queueUrls: string[] = [];

  try {
    for await (const resources of paginateListQueues(
      { client: sqsClient },
      {},
    )) {
      queueUrls.push(...(resources.QueueUrls ?? []));
    }

    return queueUrls.map(SqsQueueARN.fromQueueUrl);
  } catch (e) {
    console.log('There was an issue while getting SqsQueues: ', {
      e,
    });

    return [];
  }
};
