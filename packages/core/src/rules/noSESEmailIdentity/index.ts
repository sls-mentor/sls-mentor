import { IdentityType } from '@aws-sdk/client-sesv2';
import { fetchAllSESIdentities, isSandboxAccount } from '../../aws-sdk-helpers';
import { CustomARN, Rule } from '../../types';

const isDomainIdentity = (identityType: IdentityType): boolean =>
  identityType !== IdentityType.EMAIL_ADDRESS;

const run: Rule['run'] = async (resources: CustomARN[]) => {
  const commandOutput = await fetchAllSESIdentities(resources);
  if (await isSandboxAccount()) {
    return {
      results: commandOutput.map(({ arn }) => ({
        arn,
        success: true,
      })),
    };
  }
  const results = commandOutput.map(({ arn, identity }) => ({
    arn,
    success:
      identity.IdentityType !== undefined
        ? isDomainIdentity(identity.IdentityType as IdentityType)
        : true,
  }));

  return { results };
};

export const rule: Rule = {
  ruleName: 'SES: No Email Identities',
  errorMessage:
    'One or more SES identities have an email Identity Type, and you are not in the sandbox.',
  run,
  fileName: 'noSESEmailIdentity',
  level: 1,
  categories: ['Stability'],
  service: 'SES',
} as Rule;
