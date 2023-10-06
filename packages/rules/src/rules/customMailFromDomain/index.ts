import { fetchAllSESIdentities } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const isCustomMailFromDomain = (
  mailFromAttributes: Awaited<
    ReturnType<typeof fetchAllSESIdentities>
  >[number]['identity']['MailFromAttributes'],
): boolean => {
  if (mailFromAttributes?.MailFromDomainStatus === 'SUCCESS') {
    return true;
  }

  return false;
};

const run: Rule['run'] = async resourceArns => {
  const commandOutput = await fetchAllSESIdentities(resourceArns);
  const results = commandOutput.map(({ arn, identity }) => ({
    arn,
    success: isCustomMailFromDomain(identity.MailFromAttributes),
  }));

  return { results };
};

export const customMailFromDomain: Rule = {
  ruleName: 'SES: Custom MAIL FROM Domain',
  errorMessage: 'One or more SES identities have the default MAIL FROM domain',
  run,
  fileName: 'customMailFromDomain',
  categories: ['Stability'],
  level: 2,
  stages: [Stage.prod, Stage.dev],
  service: 'SES',
  easyToFix: true,
  severity: 'medium',
};
