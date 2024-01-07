import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';
import {
  executeQuery,
  fetchAllLambdaConfigurations,
} from '@sls-mentor/aws-api';

import { ColdStartStats, LambdaFunctionStats } from './types';

const getLogInsightsData = async (
  lambdaFunctions: LambdaFunctionARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    data:
      | {
          countColdStarts?: number;
          countInvocations?: number;
          maxColdStartTime?: number;
          averageDuration?: number;
          maxDuration?: number;
          minDuration?: number;
          averageMemoryUsed?: number;
          memoryAllocated?: number;
          percentageMemoryUsed?: number;
          averageBilledDuration?: number;
          maxBilledDuration?: number;
          averageColdStartTime?: number;
          percentageColdStarts?: number;
        }
      | undefined;
  }[]
> =>
  Promise.all(
    lambdaFunctions.map(async arn => {
      const functionName = arn.getFunctionName();

      const startTime = new Date();
      startTime.setDate(startTime.getDate() - 7);
      const endTime = new Date();

      const results = await executeQuery({
        logGroupName: `/aws/lambda/${functionName}`,
        startTime,
        endTime,
        filter: 'REPORT',
        query: {
          countInvocations: { expression: 'count(@type)' },
          countColdStarts: { expression: 'count(@initDuration)' },
          percentageColdStarts: {
            expression: '(count(@initDuration)/count(@type))*100',
          },
          maxColdStartTime: { expression: 'max(@initDuration)' },
          averageDuration: { expression: 'avg(@duration)' },
          maxDuration: { expression: 'max(@duration)' },
          minDuration: { expression: 'min(@duration)' },
          averageMemoryUsed: { expression: 'avg(@maxMemoryUsed)' },
          memoryAllocated: { expression: 'max(@memorySize)' },
          percentageMemoryUsed: {
            expression: '(avg(@maxMemoryUsed)/max(@memorySize))*100',
          },
          averageBilledDuration: { expression: 'avg(@billedDuration)' },
          maxBilledDuration: { expression: 'max(@billedDuration)' },
          averageColdStartTime: { expression: 'avg(@initDuration)' },
        },
      });

      return {
        arn,
        data: results,
      };
    }),
  );

const mapColdStartStats = (
  logInsightsData: Awaited<
    ReturnType<typeof getLogInsightsData>
  >[number]['data'],
): ColdStartStats | undefined => {
  if (logInsightsData === undefined) {
    return undefined;
  }

  const { averageColdStartTime, maxColdStartTime, percentageColdStarts } =
    logInsightsData;

  if (
    averageColdStartTime === undefined ||
    maxColdStartTime === undefined ||
    percentageColdStarts === undefined
  ) {
    return undefined;
  }

  return {
    averageDuration: averageColdStartTime,
    maxDuration: maxColdStartTime,
    coldStartPercentage: percentageColdStarts,
  };
};

const mapConfigurationStats = (
  lambdaFunctionConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
): LambdaFunctionStats['configuration'] => {
  const { MemorySize, Timeout, CodeSize } = lambdaFunctionConfiguration;

  if (
    MemorySize === undefined ||
    Timeout === undefined ||
    CodeSize === undefined
  ) {
    throw new Error('Unexpected undefined value in configuration');
  }

  return {
    memorySize: MemorySize,
    bundleSize: CodeSize,
    timeout: Timeout,
  };
};

export const getLambdaFunctionNodes = async (
  arns: CustomARN[],
): Promise<
  Record<
    string,
    {
      arn: LambdaFunctionARN;
      stats: LambdaFunctionStats;
    }
  >
> => {
  const lambdaFunctionArns = CustomARN.filterArns(arns, LambdaFunctionARN);

  const logInsightsData = await getLogInsightsData(lambdaFunctionArns);
  const lambdaFunctionConfigurations =
    await fetchAllLambdaConfigurations(lambdaFunctionArns);

  return Object.fromEntries(
    lambdaFunctionConfigurations.map(({ arn, configuration }) => {
      const logInsights = logInsightsData.find(({ arn: logInsightsArn }) =>
        arn.is(logInsightsArn),
      )?.data;

      return [
        arn.toString(),
        {
          arn,
          stats: {
            configuration: mapConfigurationStats(configuration),
            coldStarts: mapColdStartStats(logInsights),
          },
        },
      ];
    }),
  );
};
