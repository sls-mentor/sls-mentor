import {
  GetQueueAttributesCommand,
  GetQueueAttributesCommandOutput,
} from '@aws-sdk/client-sqs';
import { ARN } from '@aws-sdk/util-arn-parser';
import { sqsCLient } from '../../clients';
import { filterServiceFromResourceArns } from '../common';

type QueueAttributes = {
  arn: ARN;
  attributes: GetQueueAttributesCommandOutput;
};
export const fetchQueueAttributesByArn = async (
  arn: ARN,
): Promise<QueueAttributes> => {
  return {
    arn: arn,
    attributes: await sqsCLient.send(
      new GetQueueAttributesCommand({
        QueueUrl: arn.resource,
        AttributeNames: ['RedrivePolicy'],
      }),
    ),
  };
};

export const fetchAllQueuesAttributes = async (
  resourceArns: ARN[],
): Promise<QueueAttributes[]> => {
  const queues = filterServiceFromResourceArns(resourceArns, 'sqs');

  const AttributesByArn = await Promise.all(
    queues.map(arn => fetchQueueAttributesByArn(arn)),
  );

  return AttributesByArn;
};
