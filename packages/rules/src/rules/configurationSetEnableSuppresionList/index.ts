import { fetchAllSESConfigurationSets } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const isSuppressionListEnabled = (
  configurationSet: Awaited<
    ReturnType<typeof fetchAllSESConfigurationSets>
  >[number]['configurationSet'],
): boolean => {
  if (
    configurationSet.SuppressionOptions?.SuppressedReasons !== undefined &&
    configurationSet.SuppressionOptions.SuppressedReasons.length > 0
  ) {
    return true;
  }

  return false;
};

const run: Rule['run'] = async resourceArns => {
  const commandOutput = await fetchAllSESConfigurationSets(resourceArns);
  const results = commandOutput.map(({ arn, configurationSet }) => ({
    arn,
    success: isSuppressionListEnabled(configurationSet),
  }));

  return { results };
};

export const configurationSetEnableSuppresionList: Rule = {
  ruleName: 'SES configuration sets should enable suppression list ',
  errorMessage: 'Some SES configuration sets have not enabled suppression list',
  run,
  fileName: 'configurationSetEnableSuppresionList',
  categories: ['Stability'],
  level: 4,
  stages: [Stage.prod, Stage.dev],
  service: 'SES',
  easyToFix: true,
  severity: 'medium',
};
