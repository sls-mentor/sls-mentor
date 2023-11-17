import { fetchAllSESIdentities } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const configSetIsAssigned = (
  configurationSetName: string | undefined,
): boolean => {
  if (configurationSetName !== undefined) {
    return true;
  }

  return false;
};

const run: Rule['run'] = async resourceArns => {
  const commandOutput = await fetchAllSESIdentities(resourceArns);
  const results = commandOutput.map(({ arn, identity }) => ({
    arn,
    success: configSetIsAssigned(identity.ConfigurationSetName),
  }));

  return { results };
};

export const assignDefaultConfigurationSet: Rule = {
  ruleName: 'SES: assign default configuration set',
  errorMessage:
    'You have not assigned a default configuration set to your SES identity',
  run,
  fileName: 'assignDefaultConfigurationSet',
  categories: ['Stability'],
  level: 1, // Set level related to rule
  stages: [Stage.prod, Stage.dev],
  service: 'SES',
  easyToFix: false,
  severity: 'medium',
};
