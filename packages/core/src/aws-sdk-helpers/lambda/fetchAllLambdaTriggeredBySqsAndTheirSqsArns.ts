import intersectionWith from 'lodash/intersectionWith';
import { CustomARN, LambdaFunctionARN, SqsQueueARN } from '../../types';
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
      sqsTriggers: intersectionWith(
        eventSourceMappings
          .map(({ EventSourceArn }) => EventSourceArn)
          .filter(
            (eventSourceArn): eventSourceArn is string =>
              eventSourceArn !== undefined,
          )
          .map(CustomARN.fromArnString),
        sqsQueueArns,
        CustomARN.areARNsEqual,
      ).map(sqsQueueARN => ({
        arn: sqsQueueARN,
      })),
    }))
    .filter(({ sqsTriggers }) => sqsTriggers.length !== 0);
};
