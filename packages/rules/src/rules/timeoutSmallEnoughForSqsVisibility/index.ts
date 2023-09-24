import {
  fetchAllLambdaTriggeredBySqsAndTheirSqsArns,
  fetchLambdaConfigurationByArn,
  fetchQueueAttributesByArn,
} from '@sls-mentor/aws-api';

import { Rule } from 'types';

const isTimeoutValid = (
  sqsVisibilityTimeout: number,
  lambdaTimeout: number,
): boolean => sqsVisibilityTimeout >= 6 * lambdaTimeout;
const AWS_LAMBDA_DEFAULT_TIMEOUT = 3;
const AWS_SQS_DEFAULT_VISIBILITY_TIMEOUT = '30';

const run: Rule['run'] = async resourceArns => {
  const lambdaAndTheirSqsTriggersArns =
    await fetchAllLambdaTriggeredBySqsAndTheirSqsArns(resourceArns);
  const lambdaSqsTriggersAndTimeout = await Promise.all(
    lambdaAndTheirSqsTriggersArns.map(async ({ arn, sqsTriggers }) => {
      const sqsTriggersArnAndTimeouts = await Promise.all(
        sqsTriggers.map(async ({ arn: sqsQueueArn }) => {
          const { attributes: sqsQueueAttributes } =
            await fetchQueueAttributesByArn(sqsQueueArn);

          return {
            arn: sqsQueueArn,
            visibilityTimeout: parseInt(
              sqsQueueAttributes.Attributes?.VisibilityTimeout ??
                AWS_SQS_DEFAULT_VISIBILITY_TIMEOUT,
            ),
          };
        }),
      );

      const { configuration: lambdaConfiguration } =
        await fetchLambdaConfigurationByArn(arn);

      return {
        arn,
        sqsTriggersArnAndTimeouts,
        lambdaTimeout:
          lambdaConfiguration.Timeout ?? AWS_LAMBDA_DEFAULT_TIMEOUT,
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

export const timeoutSmallEnoughForSqsVisibility: Rule = {
  ruleName: 'Lambda: Timeout compatible with SQS trigger visibility timeout',
  errorMessage:
    'The function is triggered by SQS queues whose visibility timeout is less that 6 times the function timeout',
  run,
  fileName: 'timeoutSmallEnoughForSqsVisibility',
  categories: ['Stability'],
  level: 3,
  easyToFix: true,
  severity: 'high',
  service: 'Lambda',
};
