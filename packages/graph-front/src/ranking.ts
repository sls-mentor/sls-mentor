import { DynamoDBTableARN, LambdaFunctionARN } from '@sls-mentor/arn';
import {
  DynamoDBTableNode,
  LambdaFunctionNode,
  Node,
} from '@sls-mentor/graph-core';
import { NodeWithLocationAndRank } from './types';

export const RankingKey = {
  averageColdStartDuration: 'averageColdStartDuration',
  maxColdStartDuration: 'maxColdStartDuration',
  coldStartPercentage: 'coldStartPercentage',
  memorySize: 'memorySize',
  bundleSize: 'bundleSize',
  timeout: 'timeout',
  averageDuration: 'averageDuration',
  maxDuration: 'maxDuration',
  averageMemoryUsed: 'averageMemoryUsed',
  percentageMemoryUsed: 'percentageMemoryUsed',
  itemCount: 'itemCount',
  tableSize: 'tableSize',
  averageItemSize: 'averageItemSize',
} as const;
export type RankingKey = (typeof RankingKey)[keyof typeof RankingKey];

export const rankingKeyTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'Average Cold Start Duration',
  maxColdStartDuration: 'Max Cold Start Duration',
  coldStartPercentage: 'Cold Start Percentage',
  memorySize: 'Memory Size',
  bundleSize: 'Bundle Size',
  timeout: 'Timeout',
  averageDuration: 'Average Duration',
  maxDuration: 'Max Duration',
  averageMemoryUsed: 'Average Memory Used',
  percentageMemoryUsed: 'Percentage Memory Used',
  itemCount: 'Item Count',
  tableSize: 'Table Size',
  averageItemSize: 'Average Item Size',
};

export const rankingUnit: Record<RankingKey, string> = {
  averageColdStartDuration: 'ms',
  maxColdStartDuration: 'ms',
  coldStartPercentage: '%',
  memorySize: 'MB',
  bundleSize: 'MB',
  timeout: 's',
  averageDuration: 'ms',
  maxDuration: 'ms',
  averageMemoryUsed: 'MB',
  percentageMemoryUsed: '%',
  itemCount: 'items',
  tableSize: 'MB',
  averageItemSize: 'kB',
};

export const isLambdaNode = (node: Node): node is LambdaFunctionNode =>
  LambdaFunctionARN.is(node.arn);

export const isDynamoDBTableNode = (node: Node): node is DynamoDBTableNode =>
  DynamoDBTableARN.is(node.arn);

export const rankingFunctions: Record<
  RankingKey,
  (node: NodeWithLocationAndRank) => number | undefined
> = {
  averageColdStartDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.averageDuration;
  },
  maxColdStartDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.maxDuration;
  },
  coldStartPercentage: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.coldStartPercentage;
  },
  memorySize: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.memorySize;
  },
  bundleSize: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.bundleSize / 1000;
  },
  timeout: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.timeout;
  },
  averageDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.averageDuration;
  },
  maxDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.maxDuration;
  },
  averageMemoryUsed: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    const averageMemoryUsed = node.stats.execution?.averageMemoryUsed;

    if (averageMemoryUsed === undefined) {
      return undefined;
    }

    return averageMemoryUsed / 1000000;
  },
  percentageMemoryUsed: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.percentageMemoryUsed;
  },
  tableSize: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    const tableSizeBytes = node.stats.configuration?.tableSize;

    if (tableSizeBytes === undefined) {
      return undefined;
    }

    return tableSizeBytes / 1000000;
  },
  itemCount: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    return node.stats.configuration?.itemCount;
  },
  averageItemSize: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    const averageItemSizeBytes = node.stats.configuration?.averageItemSize;

    if (averageItemSizeBytes === undefined) {
      return undefined;
    }

    return averageItemSizeBytes / 1000;
  },
};
