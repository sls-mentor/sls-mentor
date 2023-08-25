import { fetchAllSubscriptions } from '../../aws-sdk-helpers/sns/fetchSubscriptions';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

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
  service: 'SNS',
  easyToFix: false,
  severity: 'medium',
  stage: [Stage.dev, Stage.prod],
};
