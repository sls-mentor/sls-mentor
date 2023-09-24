import {
  LogGroup,
  paginateDescribeLogGroups,
} from '@aws-sdk/client-cloudwatch-logs';

import { CloudwatchLogGroupARN, CustomARN } from '@sls-mentor/arn';

import { cloudWatchLogsClient } from 'clients';

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
  resources: CustomARN[],
): Promise<{ arn: CloudwatchLogGroupARN; configuration: LogGroup }[]> => {
  const logGroupsArns = CustomARN.filterArns(resources, CloudwatchLogGroupARN);

  const allLogGroups = await listLogGroupConfigurations();

  return allLogGroups.filter(({ arn }) =>
    logGroupsArns.some(logGroupArn => logGroupArn.is(arn)),
  );
};
