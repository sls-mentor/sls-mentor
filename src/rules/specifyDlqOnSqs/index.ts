import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllQueuesAttributes } from '../../helpers';
import { Rule, Rules } from '../../types';

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
  run,
  rule: Rules.SPECIFY_DLQ_ON_SQS,
};

export default rule;
