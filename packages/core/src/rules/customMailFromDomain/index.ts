import { MailFromAttributes } from '@aws-sdk/client-sesv2';
import { fetchAllSESIdentities } from 'aws-sdk-helpers';
import { Rule } from 'types';

const isCustomMailFromDomain = (
  mailFromAttributes: MailFromAttributes | undefined,
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
  service: 'SES',
};
