import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllQueuesAttributes } from '../../aws-sdk-helpers';
import { Category, Rule } from '../../types';

interface RedrivePolicy {
  deadLetterTargetArn: string;
}
const hasDeadLetterQueue = (redrivePolicy: string | undefined): boolean =>
  redrivePolicy !== undefined;

const run: Rule['run'] = async resourceArns => {
  const queuesAttributesByArn = await fetchAllQueuesAttributes(resourceArns);
  const deadLetterQueuesArn: string[] = [];
  queuesAttributesByArn.forEach(queue => {
    const redrivePolicy = queue.attributes.Attributes?.RedrivePolicy;
    if (redrivePolicy !== undefined) {
      const deadLetterTargetArn = (JSON.parse(redrivePolicy) as RedrivePolicy)
        .deadLetterTargetArn;
      deadLetterQueuesArn.push(deadLetterTargetArn);
    }
  });

  const results = queuesAttributesByArn
    .filter(queue => !deadLetterQueuesArn.includes(build(queue.arn)))
    .map(queue => ({
      arn: build(queue.arn),
      success: hasDeadLetterQueue(queue.attributes.Attributes?.RedrivePolicy),
    }));

  return { results };
};

const rule: Rule = {
  displayName: 'Specifying a DLQ on SQS',
  errorMessage:
    'The queue does not have a specified Dead Letter Queue. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/specifyDlqOnSqs/specifyDlqOnSqs.md)',
  run,
  fileName: 'specifyDlqOnSqs',
  categories: [Category.STABILITY],
};

export default rule;
