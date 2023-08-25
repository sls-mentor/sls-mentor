import { LogGroup } from '@aws-sdk/client-cloudwatch-logs';
import { fetchAllLogGroupsConfigurations } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

const isLogsRetentionDurationDefined = (
  logGroupConfiguration: LogGroup,
): boolean => logGroupConfiguration.retentionInDays !== undefined;

const run: Rule['run'] = async resourceArns => {
  const logGroupsConfiguration = await fetchAllLogGroupsConfigurations(
    resourceArns,
  );
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
  service: 'CloudWatch',
  easyToFix: true,
  severity: 'low',
  stage: [Stage.dev, Stage.prod],
};
