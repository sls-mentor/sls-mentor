import {
  LogGroup,
  paginateDescribeLogGroups,
} from '@aws-sdk/client-cloudwatch-logs';
import { cloudWatchLogsClient } from '../../clients';
import { CloudwatchLogGroupARN, GuardianARN } from '../../types';

const listLogGroupConfigurations = async (): Promise<
  { arn: CloudwatchLogGroupARN; configuration: LogGroup }[]
> => {
  const logGroups = [];
  for await (const page of paginateDescribeLogGroups(
    { client: cloudWatchLogsClient },
    {},
  )) {
    logGroups.push(...(page.logGroups ?? []));
  }

  return logGroups.map(logGroup => ({
    arn: CloudwatchLogGroupARN.fromLogGroupName(logGroup.logGroupName ?? ''),
    configuration: logGroup,
  }));
};

export const fetchAllLogGroupsConfigurations = async (
  resources: GuardianARN[],
): Promise<{ arn: CloudwatchLogGroupARN; configuration: LogGroup }[]> => {
  const logGroupsArns = GuardianARN.filterArns(
    resources,
    CloudwatchLogGroupARN,
  );

  const allLogGroups = await listLogGroupConfigurations();

  return allLogGroups.filter(({ arn }) =>
    logGroupsArns.some(logGroupArn => logGroupArn.is(arn)),
  );
};
