import { build } from '@aws-sdk/util-arn-parser';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllQueuesAttributes } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type SpecifyDLQRule = Rule<Configuration>;

interface RedrivePolicy {
  deadLetterTargetArn: string;
}
const hasDeadLetterQueue = (redrivePolicy: string | undefined): boolean =>
  redrivePolicy !== undefined;

const run: SpecifyDLQRule['run'] = async resourceArns => {
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

const rule: SpecifyDLQRule = {
  name: 'SPECIFY_DLQ_ON_SQS',
  displayName: 'Specifying a DLQ on SQS',
  errorMessage:
    'The queue does not have a specified Dead Letter Queue. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/specifyDlqOnSqs/specifyDlqOnSqs.md)',
  run,
  fileName: 'specifyDlqOnSqs',
  categories: [Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
