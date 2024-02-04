import { DynamoDBTableARN, LambdaFunctionARN } from '@sls-mentor/arn';
import {
  DynamoDBTableNode,
  LambdaFunctionNode,
  Node,
} from '@sls-mentor/graph-core';
import { NodeWithLocationAndRank, RankingKey } from '../types';

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

    return node.stats.configuration.bundleSize / 1000000;
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
