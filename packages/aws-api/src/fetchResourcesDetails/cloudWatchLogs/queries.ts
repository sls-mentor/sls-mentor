import {
  GetQueryResultsCommand,
  ResourceNotFoundException,
  ResultField,
  StartQueryCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import pLimit from 'p-limit';

import { cloudWatchLogsClient } from 'clients';

// AWS CloudWatch Logs allows 30 concurrent queries
const limit = pLimit(25);

const limitedExecuteQuery = async ({
  startTime,
  endTime,
  logGroupName,
  queryString,
  maxWaitTime = 60000,
}: {
  startTime: Date;
  endTime: Date;
  logGroupName: string;
  queryString: string;
  maxWaitTime?: number;
}): Promise<ResultField[][] | undefined> => {
  let queryId: string | undefined;

  try {
    const result = await cloudWatchLogsClient.send(
      new StartQueryCommand({
        logGroupName,
        startTime: Math.floor(startTime.getTime() / 1000),
        endTime: Math.floor(endTime.getTime() / 1000),
        queryString,
      }),
    );

    if (result.queryId === undefined) {
      return undefined;
    }

    queryId = result.queryId;
  } catch (error) {
    if (error instanceof ResourceNotFoundException) {
      return undefined;
    }

    throw error;
  }

  await new Promise(resolve => setTimeout(resolve, maxWaitTime / 20));

  for (let i = 0; i < 9; i++) {
    const { results, status } = await cloudWatchLogsClient.send(
      new GetQueryResultsCommand({
        queryId,
        // @ts-expect-error - This key is used to avoid hitting the cache
        uniqueIdentifier: `${Date.now()}`,
      }),
    );

    if (status === 'Complete') {
      return results;
    }

    await new Promise(resolve => setTimeout(resolve, maxWaitTime / 10));
  }

  return undefined;
};

type QueryAttributes = {
  [alias: string]: { expression: string };
};

export const executeQuery = async <T extends QueryAttributes>({
  startTime,
  endTime,
  logGroupName,
  query,
  filter,
  maxWaitTime = 60000,
}: {
  startTime: Date;
  endTime: Date;
  logGroupName: string;
  query: T;
  filter: string;
  maxWaitTime?: number;
}): Promise<{ [alias in keyof T]: number | undefined } | undefined> => {
  let stringifiedQuery = `filter @type = "${filter}" | stats `;

  Object.entries(query).forEach(([alias, { expression }]) => {
    stringifiedQuery += `${expression} as ${alias}, `;
  });

  const results = await limit(() =>
    limitedExecuteQuery({
      startTime,
      endTime,
      logGroupName,
      queryString: stringifiedQuery.slice(0, -2),
      maxWaitTime,
    }),
  );

  return Object.fromEntries(
    Object.keys(query).map(alias => {
      const value = results?.[0]?.find(({ field }) => field === alias)?.value;

      if (value === undefined) {
        return [alias, undefined];
      }

      return [alias, +value];
    }),
  ) as { [alias in keyof T]: number | undefined };
};
