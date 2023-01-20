import {
  LogGroup,
  paginateDescribeLogGroups,
} from '@aws-sdk/client-cloudwatch-logs';
import { cloudWatchLogsClient } from '../../../clients';
import { CloudwatchLogGroupARN } from '../../../types';

export const listCloudwatchLogGroups = async (): Promise<
  CloudwatchLogGroupARN[]
> => {
  const cloudwatchLogGroups: LogGroup[] = [];

  for await (const resources of paginateDescribeLogGroups(
    { client: cloudWatchLogsClient },
    {},
  )) {
    cloudwatchLogGroups.push(...(resources.logGroups ?? []));
  }

  return cloudwatchLogGroups
    .map(({ logGroupName }) => logGroupName)
    .filter(
      (logGroupName): logGroupName is string => logGroupName !== undefined,
    )
    .map(CloudwatchLogGroupARN.fromLogGroupName);
};
