import { fetchAllSubscriptions } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const checkSubscriptionRedrivePolicy = (
  attributes: Record<string, string | undefined> | undefined,
) => {
  if (attributes === undefined) {
    return true;
  }

  return attributes['RedrivePolicy'] !== undefined;
};
const run: Rule['run'] = async resourceArns => {
  const snsSubscriptionAttributes = await fetchAllSubscriptions(resourceArns);
  const results = snsSubscriptionAttributes.map(({ arn, attributes }) => ({
    arn,
    success: checkSubscriptionRedrivePolicy(attributes),
  }));

  return { results };
};

export const snsRedrivePolicy: Rule = {
  ruleName: 'SNS: Subscription has redrive policy',
  errorMessage: 'SNS subscription without redrive policy',
  run,
  fileName: 'snsRedrivePolicy',
  categories: ['Stability'],
  level: 4,
  stages: [Stage.prod, Stage.dev],
  service: 'SNS',
  easyToFix: false,
  severity: 'medium',
};
