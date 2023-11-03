import {
  GetQueueAttributesCommand,
  GetQueueAttributesCommandOutput,
} from '@aws-sdk/client-sqs';

import { CustomARN, SqsQueueARN } from '@sls-mentor/arn';

import { sqsClient } from 'clients';

type QueueAttributes = {
  arn: SqsQueueARN;
  attributes: GetQueueAttributesCommandOutput;
};
export const fetchQueueAttributesByArn = async (
  arn: SqsQueueARN,
): Promise<QueueAttributes> => {
  return {
    arn: arn,
    attributes: await sqsClient.send(
      new GetQueueAttributesCommand({
        QueueUrl: arn.resource,
        AttributeNames: ['All'],
      }),
    ),
  };
};

export const fetchAllQueuesAttributes = async (
  resourceArns: CustomARN[],
): Promise<QueueAttributes[]> => {
  const queues = CustomARN.filterArns(resourceArns, SqsQueueARN);

  const AttributesByArn = await Promise.all(
    queues.map(arn => fetchQueueAttributesByArn(arn)),
  );

  return AttributesByArn;
};
