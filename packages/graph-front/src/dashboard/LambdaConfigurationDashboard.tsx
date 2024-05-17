import { ArnService, LambdaFunctionARN } from '@sls-mentor/arn';
import { LambdaFunctionNode } from '@sls-mentor/graph-core';
import { Node } from '@sls-mentor/graph-core';
import { useMemo } from 'react';
import { GeneralDashboard } from './GeneralDashboard';
import { getOrderedStats } from './utils';

interface Props {
  nodes: Record<string, Node>;
}

export const LambdaConfigurationDashboard = ({ nodes }: Props): JSX.Element => {
  const bundleSizes = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.configuration?.bundleSize,
        node => node.arn.getFunctionName(),
      ),
    [nodes],
  );

  const memorySizes = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.configuration?.memorySize,
        node => node.arn.getFunctionName(),
        1_000_000,
      ),
    [nodes],
  );

  const timeouts = useMemo(
    () =>
      getOrderedStats<LambdaFunctionNode>(
        nodes,
        node => LambdaFunctionARN.is(node.arn),
        node => node.stats?.configuration?.timeout,
        node => node.arn.getFunctionName(),
      ),
    [nodes],
  );

  const lambdaCount = Object.values(nodes).filter(node =>
    LambdaFunctionARN.is(node.arn),
  ).length;
  const totalBundleSize = bundleSizes.reduce(
    (acc, bucket) => acc + bucket.value,
    0,
  );

  return (
    <GeneralDashboard
      bars1={{
        data: bundleSizes,
        label: 'Bundle size',
        unit: 'B',
      }}
      bars2={{
        data: memorySizes,
        label: 'Memory size',
        unit: 'B',
      }}
      bars3={{
        data: timeouts,
        label: 'Timeout',
        unit: 'S',
      }}
      aggregate1={{
        label: 'Total Lambda functions',
        value: lambdaCount,
        unit: '',
      }}
      aggregate2={{
        label: 'Total Bundle Size',
        value: totalBundleSize,
        unit: 'B',
      }}
      service={ArnService.lambda}
      label="Configuration"
    />
  );
};
