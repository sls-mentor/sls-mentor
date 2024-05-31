import { ArnService, LambdaFunctionARN } from '@sls-mentor/arn';
import { LambdaFunctionNode } from '@sls-mentor/graph-core';
import { Node } from '@sls-mentor/graph-core';
import { useMemo } from 'react';
import { GeneralDashboard } from './GeneralDashboard';
import { getOrderedStats } from './utils';

interface Props {
  nodes: Record<string, Node>;
}

export const LambdaColdStartsDashboard = ({ nodes }: Props): JSX.Element => {
  const coldStartsAverageDuration = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.coldStarts?.averageDuration,
        node => node.arn.getFunctionName(),
        0.001,
      ),
    [nodes],
  );

  const coldStartsMaxDuration = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.coldStarts?.maxDuration,
        node => node.arn.getFunctionName(),
        0.001,
      ),
    [nodes],
  );

  const coldStartsPercentage = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.coldStarts?.coldStartPercentage,
        node => node.arn.getFunctionName(),
      ),
    [nodes],
  );

  const coldStartsCount = coldStartsAverageDuration.length;
  const lambdaCount = Object.values(nodes).filter(node =>
    LambdaFunctionARN.is(node.arn),
  ).length;

  return (
    <GeneralDashboard
      bars1={{
        data: coldStartsAverageDuration,
        label: 'Cold starts average duration',
        unit: 'S',
      }}
      bars2={{
        data: coldStartsMaxDuration,
        label: 'Cold starts max duration',
        unit: 'S',
      }}
      bars3={{
        data: coldStartsPercentage,
        label: 'Cold starts percentage',
        unit: '',
      }}
      aggregate1={{
        label: 'Total Lambda functions',
        value: lambdaCount,
        unit: '',
      }}
      aggregate2={{
        label: 'Lambda functions triggered last week',
        value: coldStartsCount,
        unit: '',
      }}
      service={ArnService.lambda}
      label="Cold Starts"
    />
  );
};
