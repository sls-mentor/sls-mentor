import { fetchAllQueuesAttributes } from '../../aws-sdk-helpers';
import { Category, GuardianARN, Rule, SqsQueueARN } from '../../types';

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

        return GuardianARN.fromArnString(deadLetterTargetArn);
      }
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
      arn: build(arn),
      success: hasDeadLetterQueue(attributes.Attributes?.RedrivePolicy),
    }));

  return { results };
};

const rule: Rule = {
  ruleName: 'Specifying a DLQ on SQS',
  errorMessage:
    'The queue does not have a specified Dead Letter Queue. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/specifyDlqOnSqs/specifyDlqOnSqs.md)',
  run,
  fileName: 'specifyDlqOnSqs',
  categories: [Category.STABILITY],
};

export default rule;
