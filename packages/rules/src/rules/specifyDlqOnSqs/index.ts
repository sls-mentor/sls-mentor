import { CustomARN, SqsQueueARN } from '@sls-mentor/arn';
import { fetchAllQueuesAttributes } from '@sls-mentor/aws-api';

import { Rule, Stage } from '../../types';

interface RedrivePolicy {
  deadLetterTargetArn: string;
}
const hasDeadLetterQueue = (redrivePolicy: string | undefined): boolean =>
  redrivePolicy !== undefined;

const run: Rule['run'] = async resourceArns => {
  const queuesAttributesByArn = await fetchAllQueuesAttributes(resourceArns);

  const deadLetterQueueArns = queuesAttributesByArn
    .map(({ attributes }) => {
      const redrivePolicy = attributes.Attributes?.RedrivePolicy;
      if (redrivePolicy !== undefined) {
        const deadLetterTargetArn = (JSON.parse(redrivePolicy) as RedrivePolicy)
          .deadLetterTargetArn;

        return CustomARN.fromArnString(deadLetterTargetArn);
      }

      return undefined;
    })
    .filter((arn): arn is SqsQueueARN => arn !== undefined);

  const results = queuesAttributesByArn
    .filter(
      ({ arn }) =>
        deadLetterQueueArns.find(deadLetterQueueArn =>
          deadLetterQueueArn.is(arn),
        ) === undefined,
    )
    .map(({ arn, attributes }) => ({
      arn,
      success: hasDeadLetterQueue(attributes.Attributes?.RedrivePolicy),
    }));

  return { results };
};

export const specifyDlqOnSqs: Rule = {
  ruleName: 'Specifying a DLQ on SQS',
  errorMessage: 'The queue does not have a specified Dead Letter Queue.',
  run,
  fileName: 'specifyDlqOnSqs',
  categories: ['Stability'],
  level: 4,
  stages: [Stage.prod, Stage.dev],
  service: 'SQS',
  easyToFix: false,
  severity: 'medium',
};
