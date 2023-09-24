import { fetchAllTopics } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const checkEncryptedSNSTopics = (
  attributes: Record<string, string | undefined> | undefined,
) => {
  if (attributes === undefined) {
    return true;
  }

  return attributes['KmsMasterKeyId'] !== undefined;
};

const run: Rule['run'] = async resourceArns => {
  const snsTopics = await fetchAllTopics(resourceArns);
  const results = snsTopics.map(({ arn, attributes }) => ({
    arn,
    success: checkEncryptedSNSTopics(attributes),
  }));

  return { results };
};

export const encryptedSnsTopics: Rule = {
  ruleName: 'SNS: Topics should be encrypted',
  errorMessage: 'SNS topics unencrypted found',
  run,
  fileName: 'encryptedSnsTopics', // Do not change
  categories: ['Security'], // Set categories related to rule
  level: 4, // Set level related to rule
  service: 'SNS', // Set service related to rule
  easyToFix: true, // is it easy to fix non-complying resources?
  severity: 'low', // what are the impacts of the problem solved by the rule?
};
