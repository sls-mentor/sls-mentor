import {
  GraphData,
  SerializedGraphData,
  deserializeGraphData,
} from '@sls-mentor/graph-core';
import { mockResults } from './mock';
import { CustomARN } from '@sls-mentor/arn';

const loadResults = () => {
  // Designed to be replaced by the CLI after the build step, will not work in dev mode!
  return JSON.parse('<<SLS-RESULTS-PLACEHOLDER>>') as SerializedGraphData;
};

export const useGraphData = (): GraphData | undefined => {
  const isProd = import.meta.env.PROD;

  const graphData: SerializedGraphData = isProd ? loadResults() : mockResults;

  const firstArn = Object.keys(graphData.nodes)[0] ?? '';
  const [, partition, , region, accountId] = firstArn.split(':');

  if (
    accountId === undefined ||
    region === undefined ||
    partition === undefined
  ) {
    return undefined;
  }

  CustomARN.setup({ accountId, region, partition });

  return deserializeGraphData(graphData);
};
