import { ArnService, DynamoDBTableARN } from '@sls-mentor/arn';
import { DynamoDBTableNode } from '@sls-mentor/graph-core';
import { Node } from '@sls-mentor/graph-core';
import { useMemo } from 'react';
import { GeneralDashboard } from './GeneralDashboard';
import { getOrderedStats } from './utils';

interface Props {
  nodes: Record<string, Node>;
}

export const DynamoDBDashboard = ({ nodes }: Props): JSX.Element => {
  const tableSizes = useMemo(
    () =>
      getOrderedStats<DynamoDBTableNode>(
        nodes,
        node => DynamoDBTableARN.is(node.arn),
        node => node.stats?.configuration?.tableSize,
        node => node.arn.getTableName(),
      ),
    [nodes],
  );

  const averageItemSizes = useMemo(
    () =>
      getOrderedStats<DynamoDBTableNode>(
        nodes,
        node => DynamoDBTableARN.is(node.arn),
        node => node.stats?.configuration?.averageItemSize,
        node => node.arn.getTableName(),
      ),
    [nodes],
  );

  const nbItems = useMemo(
    () =>
      getOrderedStats<DynamoDBTableNode>(
        nodes,
        node => DynamoDBTableARN.is(node.arn),
        node => node.stats?.configuration?.itemCount,
        node => node.arn.getTableName(),
      ),
    [nodes],
  );

  const tableCount = Object.values(nodes).filter(node =>
    DynamoDBTableARN.is(node.arn),
  ).length;
  const totalTableSize = tableSizes.reduce(
    (acc, bucket) => acc + bucket.value,
    0,
  );

  return (
    <GeneralDashboard
      bars1={{
        data: tableSizes,
        label: 'Table Size',
        unit: 'B',
      }}
      bars2={{
        data: averageItemSizes,
        label: 'Average Item Size',
        unit: 'B',
      }}
      bars3={{
        data: nbItems,
        label: 'Number of Items',
        unit: '',
      }}
      aggregate1={{
        label: 'Total DynamoDB Tables',
        value: tableCount,
        unit: '',
      }}
      aggregate2={{
        label: 'Total Table Size',
        value: totalTableSize,
        unit: 'B',
      }}
      service={ArnService.dynamodb}
      label="Table Size"
    />
  );
};
