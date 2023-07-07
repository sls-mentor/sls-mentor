import { GetConfigurationSetCommandOutput } from '@aws-sdk/client-sesv2';
import { Rule } from '../../types';
import { fetchAllSESConfigurationSets } from '../../aws-sdk-helpers';

const isReputationMetricsEnabled = (
  configurationSet: GetConfigurationSetCommandOutput,
): boolean => {
  if (configurationSet.ReputationOptions?.ReputationMetricsEnabled === true) {
    return true;
  }

  return false;
};

const run: Rule['run'] = async resourceArns => {
  const commandOutput = await fetchAllSESConfigurationSets(resourceArns);

  const results = commandOutput.map(({ arn, configurationSet }) => ({
    arn,
    success: isReputationMetricsEnabled(configurationSet),
  }));

  return { results };
};

export const enableReputationMetrics: Rule = {
  ruleName: 'SES : Reputation Metrics Enabled on Configuration Set',
  errorMessage: 'Reputation Metrics are disabled for some configuration sets',
  run,
  fileName: 'enableReputationMetrics',
  categories: ['Stability'],
  level: 3,
  service: 'SES',
  easyToFix: true,
  severity: 'medium',
};
