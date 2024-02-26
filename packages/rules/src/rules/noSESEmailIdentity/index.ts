import { fetchAllSESIdentities, isSandboxAccount } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const isDomainIdentity = (
  identityType: Awaited<
    ReturnType<typeof fetchAllSESIdentities>
  >[number]['identity']['IdentityType'],
): boolean => identityType !== 'EMAIL_ADDRESS';

const run: Rule['run'] = async resources => {
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
        ? isDomainIdentity(identity.IdentityType)
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
  stages: [Stage.prod, Stage.dev],
  categories: ['Stability'],
  service: 'SES',
} as Rule;
