/* eslint-disable max-lines */
import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';
import {
  executeQuery,
  fetchAllLambdaConfigurations,
  fetchLambdaConfigurationByArn,
} from '@sls-mentor/aws-api';

import { NodeBase } from 'types/helpers';

import {
  LambdaFunctionColdStartStats,
  LambdaFunctionConfigurationStats,
  LambdaFunctionExecutionStats,
  LambdaFunctionStats,
} from './types';

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
      const startTime = new Date();
      startTime.setDate(startTime.getDate() - 7);
      const endTime = new Date();

      const conf = await fetchLambdaConfigurationByArn(arn);

      const logGroupName =
        conf.configuration.LoggingConfig?.LogGroup ??
        `/aws/lambda/${arn.getFunctionName()}`;

      const results = await executeQuery({
        logGroupName,
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
): LambdaFunctionColdStartStats | undefined => {
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

const mapExecutionStats = (
  logInsightsData: Awaited<
    ReturnType<typeof getLogInsightsData>
  >[number]['data'],
): LambdaFunctionExecutionStats | undefined => {
  if (logInsightsData === undefined) {
    return undefined;
  }

  const {
    averageDuration,
    averageMemoryUsed,
    percentageMemoryUsed,
    maxDuration,
  } = logInsightsData;

  if (
    averageDuration === undefined ||
    averageMemoryUsed === undefined ||
    percentageMemoryUsed === undefined ||
    maxDuration === undefined
  ) {
    return undefined;
  }

  return {
    averageDuration,
    maxDuration,
    percentageMemoryUsed,
    averageMemoryUsed,
  };
};

const mapConfigurationStats = (
  lambdaFunctionConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
): LambdaFunctionConfigurationStats => {
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
  resources: {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[],
): Promise<
  Record<string, NodeBase<LambdaFunctionARN, LambdaFunctionStats>>
> => {
  const lambdaFunctionArns = CustomARN.filterArns(
    resources.map(({ arn }) => arn),
    LambdaFunctionARN,
  );

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
            execution: mapExecutionStats(logInsights),
          },
          cloudformationStack: resources.find(resource => resource.arn.is(arn))
            ?.cloudformationStack,
          tags: resources.find(resource => resource.arn.is(arn))?.tags ?? {},
          vpcConfig:
            configuration.VpcConfig?.VpcId === ''
              ? undefined
              : configuration.VpcConfig,
        },
      ];
    }),
  );
};
