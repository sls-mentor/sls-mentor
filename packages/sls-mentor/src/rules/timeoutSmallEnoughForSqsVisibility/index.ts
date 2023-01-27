import intersectionWith from 'lodash/intersectionWith';
import {
  fetchAllLambdaEventSourceMappings,
  fetchLambdaConfigurationByArn,
  fetchQueueAttributesByArn
} from '../../aws-sdk-helpers';
import { SlsMentorLevel } from '../../constants/level';
import { Category, CustomARN, Rule, SqsQueueARN } from '../../types';

const isTimeoutValid = (
  sqsVisibilityTimeout: number,
  lambdaTimeout: number,
): boolean => sqsVisibilityTimeout >= 6 * lambdaTimeout;

const run: Rule['run'] = async resourceArns => {
  const sqsQueueArns = CustomARN.filterArns(resourceArns, SqsQueueARN);
  const lambdaEventSourceMappings = await fetchAllLambdaEventSourceMappings(
    resourceArns,
  );

  const lambdaSqsTriggersAndTimeout = await Promise.all(
    lambdaEventSourceMappings
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
      .filter(({ sqsTriggers }) => sqsTriggers.length !== 0)
      .map(async ({ arn, sqsTriggers }) => {
        const sqsTriggersArnAndTimeouts = await Promise.all(
          sqsTriggers.map(async ({ arn: sqsQueueArn }) => {
            const { attributes: sqsQueueAttributes } =
              await fetchQueueAttributesByArn(sqsQueueArn);

            return {
              arn: sqsQueueArn,
              visibilityTimeout: parseInt(
                sqsQueueAttributes.Attributes?.VisibilityTimeout ?? '',
              ),
            };
          }),
        );

        const { configuration: lambdaConfiguration } =
          await fetchLambdaConfigurationByArn(arn);

        return {
          arn,
          sqsTriggersArnAndTimeouts,
          lambdaTimeout: lambdaConfiguration.Timeout ?? 3,
        };
      }),
  );

  const results = lambdaSqsTriggersAndTimeout.map(
    ({ arn, sqsTriggersArnAndTimeouts, lambdaTimeout }) => ({
      arn,
      success: sqsTriggersArnAndTimeouts.every(({ visibilityTimeout }) =>
        isTimeoutValid(visibilityTimeout, lambdaTimeout),
      ),
      lambdaTimeout,
      sqsQueuesWithLowVisibilityTimeout: sqsTriggersArnAndTimeouts
        .filter(
          ({ visibilityTimeout }) =>
            !isTimeoutValid(visibilityTimeout, lambdaTimeout),
        )
        .map(
          ({ arn: sqsQueueArn, visibilityTimeout }) =>
            `Queue ${sqsQueueArn.resource} has only ${visibilityTimeout}s timeout`,
        ),
    }),
  );

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda: Timeout compatible with SQS trigger visibility timeout',
  errorMessage:
    'The function is triggered by SQS queues whose visibility timeout is less that 6 times the function timeout',
  run,
  fileName: 'timeoutSmallEnoughForSqsVisibility',
  categories: [Category.STABILITY],
  level: SlsMentorLevel.Level3,
} as Rule;

export default rule;
