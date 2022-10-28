import {
  CloudWatchLogsClient,
  LogGroup,
  paginateDescribeLogGroups,
} from '@aws-sdk/client-cloudwatch-logs';
import { ARN, build, parse } from '@aws-sdk/util-arn-parser';
import { filterCloudWatchLogsFromResources } from './filterCloudWatchLogsFromResources';

const fetchAllLogGroupsConfiguration = async (
  client: CloudWatchLogsClient,
): Promise<LogGroup[] | undefined> => {
  const logGroups = [];
  for await (const page of paginateDescribeLogGroups({ client }, {})) {
    logGroups.push(...(page.logGroups ?? []));
  }

  return logGroups.map(logGroup => ({
    ...logGroup,
    // transformation needed to format the arn the same way as tagging client does
    arn: logGroup.arn?.replace(/:\*/, ''),
  }));
};

export const fetchAllLogGroupsConfigurations = async (
  resources: ARN[],
): Promise<{ arn: ARN; configuration: LogGroup }[]> => {
  const client = new CloudWatchLogsClient({});
  const logGroupsArns = filterCloudWatchLogsFromResources(resources).map(arn =>
    build(arn),
  );
  const allLogGroups = await fetchAllLogGroupsConfiguration(client);

  const logGroups = (allLogGroups ?? []).filter(({ arn }) =>
    logGroupsArns.includes(arn ?? ''),
  );

  return Promise.all(
    logGroups.map(logGroup => ({
      arn: parse(logGroup.arn ?? ''),
      configuration: logGroup,
    })),
  );
};
