import { fetchAllQueuesAttributes } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const isSseEnabled = (attributes?: Record<string, unknown>) => {
  if (attributes === undefined) {
    return false;
  }
  const hasManagedSse = attributes['SqsManagedSseEnabled'] === 'true';
  const hasKmsSse = attributes['KmsMasterKeyId'] !== undefined;

  return hasKmsSse || hasManagedSse;
};

const run: Rule['run'] = async resourceArns => {
  const queues = await fetchAllQueuesAttributes(resourceArns);
  const results = queues.map(({ arn, attributes }) => ({
    arn,
    success: isSseEnabled(attributes.Attributes),
  }));

  return { results };
};

export const encryptedSqsQueues: Rule = {
  ruleName: 'SQS: Queues should be encrypted',
  errorMessage: 'SQS queues unencrypted found',
  run,
  fileName: 'encryptedSqsQueues',
  categories: ['Security'],
  level: 4,
  service: 'SQS',
  easyToFix: true,
  severity: 'low',
};
