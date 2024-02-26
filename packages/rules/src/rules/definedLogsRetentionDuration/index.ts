import { fetchAllLogGroupsConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const isLogsRetentionDurationDefined = (
  logGroupConfiguration: Awaited<
    ReturnType<typeof fetchAllLogGroupsConfigurations>
  >[number]['configuration'],
): boolean => logGroupConfiguration.retentionInDays !== undefined;

const run: Rule['run'] = async resourceArns => {
  const logGroupsConfiguration =
    await fetchAllLogGroupsConfigurations(resourceArns);
  const results = logGroupsConfiguration.map(({ arn, configuration }) => ({
    arn,
    success: isLogsRetentionDurationDefined(configuration),
  }));

  return { results };
};

export const definedLogsRetentionDuration: Rule = {
  ruleName: 'CloudWatch Logs: Define a retention duration',
  errorMessage: 'RetentionInDays of the log group is undefined.',
  run,
  fileName: 'definedLogsRetentionDuration',
  categories: ['GreenIT', 'ITCosts'],
  level: 3,
  stages: [Stage.prod, Stage.dev],
  service: 'CloudWatch',
  easyToFix: true,
  severity: 'low',
};
