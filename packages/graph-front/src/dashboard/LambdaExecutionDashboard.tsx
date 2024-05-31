import { ArnService, LambdaFunctionARN } from '@sls-mentor/arn';
import { LambdaFunctionNode } from '@sls-mentor/graph-core';
import { Node } from '@sls-mentor/graph-core';
import { useMemo } from 'react';
import { GeneralDashboard } from './GeneralDashboard';
import { getOrderedStats } from './utils';

interface Props {
  nodes: Record<string, Node>;
}

export const LambdaExecutionDashboard = ({ nodes }: Props): JSX.Element => {
  const averageDuration = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.execution?.averageDuration,
        node => node.arn.getFunctionName(),
        0.001,
      ),
    [nodes],
  );

  const maxDuration = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.execution?.maxDuration,
        node => node.arn.getFunctionName(),
        0.001,
      ),
    [nodes],
  );

  const percentageMemoryUsed = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.execution?.percentageMemoryUsed,
        node => node.arn.getFunctionName(),
      ),
    [nodes],
  );

  const executionCount = averageDuration.length;
  const lambdaCount = Object.values(nodes).filter(node =>
    LambdaFunctionARN.is(node.arn),
  ).length;

  return (
    <GeneralDashboard
      bars1={{
        data: averageDuration,
        label: 'Average duration',
        unit: 'S',
      }}
      bars2={{
        data: maxDuration,
        label: 'Max duration',
        unit: 'S',
      }}
      bars3={{
        data: percentageMemoryUsed,
        label: 'Percentage memory used',
        unit: '',
      }}
      aggregate1={{
        label: 'Total Lambda functions',
        value: lambdaCount,
        unit: '',
      }}
      aggregate2={{
        label: 'Lambda functions triggered last week',
        value: executionCount,
        unit: '',
      }}
      service={ArnService.lambda}
      label="Execution"
    />
  );
};
