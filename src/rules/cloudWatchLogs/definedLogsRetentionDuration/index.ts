import { LogGroup } from '@aws-sdk/client-cloudwatch-logs';
import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllLogGroupsConfigurations } from '../../../aws-sdk-helpers';
import { Category, Rule } from '../../../types';

const isLogsRetentionDurationDefined = (
  logGroupConfiguration: LogGroup,
): boolean => logGroupConfiguration.retentionInDays !== undefined;

const run: Rule['run'] = async resourceArns => {
  const logGroupsConfiguration = await fetchAllLogGroupsConfigurations(
    resourceArns,
  );
  const results = logGroupsConfiguration.map(({ arn, configuration }) => ({
    arn: build(arn),
    success: isLogsRetentionDurationDefined(configuration),
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'CloudWatch Logs: Define a retention duration',
  errorMessage: 'RetentionInDays of the log group is undefined.',
  run,
  fileName: 'definedLogsRetentionDuration',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
};

export default rule;
