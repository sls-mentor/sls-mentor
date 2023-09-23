import { CustomARN, LambdaFunctionARN, SqsQueueARN } from '@sls-mentor/arn';

import { fetchAllLambdaEventSourceMappings } from './fetchAllLambdaEventSourceMappings';

export const fetchAllLambdaTriggeredBySqsAndTheirSqsArns = async (
  resourceArns: CustomARN[],
): Promise<
  { arn: LambdaFunctionARN; sqsTriggers: { arn: SqsQueueARN }[] }[]
> => {
  const sqsQueueArns = CustomARN.filterArns(resourceArns, SqsQueueARN);
  const lambdaEventSourceMappings = await fetchAllLambdaEventSourceMappings(
    resourceArns,
  );

  return lambdaEventSourceMappings
    .map(({ arn, eventSourceMappings }) => ({
      arn,
      sqsTriggers: eventSourceMappings
        .map(({ EventSourceArn }) => EventSourceArn)
        .filter(
          (eventSourceArn): eventSourceArn is string =>
            eventSourceArn !== undefined,
        )
        .map(CustomARN.fromArnString)
        .filter(eventSourceArn => sqsQueueArns.some(a => a.is(eventSourceArn)))
        .map(sqsQueueARN => ({
          arn: sqsQueueARN,
        })),
    }))
    .filter(({ sqsTriggers }) => sqsTriggers.length !== 0);
};
