import {
  LogGroup,
  paginateDescribeLogGroups,
} from '@aws-sdk/client-cloudwatch-logs';

import { CloudwatchLogGroupARN } from '@sls-mentor/arn';

import { cloudWatchLogsClient } from 'clients';

export const listCloudwatchLogGroups = async (): Promise<
  CloudwatchLogGroupARN[]
> => {
  const cloudwatchLogGroups: LogGroup[] = [];
  try {
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
  } catch (e) {
    console.log('There was an issue while getting CloudwatchLogGroups: ', {
      e,
    });

    return [];
  }
};
