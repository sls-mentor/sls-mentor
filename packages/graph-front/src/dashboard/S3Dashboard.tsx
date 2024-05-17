import { ArnService, S3BucketARN } from '@sls-mentor/arn';
import { S3BucketNode } from '@sls-mentor/graph-core';
import { Node } from '@sls-mentor/graph-core';
import { useMemo } from 'react';
import { GeneralDashboard } from './GeneralDashboard';
import { getOrderedStats } from './utils';

interface Props {
  nodes: Record<string, Node>;
}

export const S3Dashboard = ({ nodes }: Props): JSX.Element => {
  const bucketSizes = useMemo(
    () =>
      getOrderedStats<S3BucketNode>(
        nodes,
        node => S3BucketARN.is(node.arn),
        node => node.stats?.configuration?.bucketSize,
        node => node.arn.getBucketName(),
      ),
    [nodes],
  );

  const bucketCount = Object.values(nodes).filter(node =>
    S3BucketARN.is(node.arn),
  ).length;
  const totalBucketSize = bucketSizes.reduce(
    (acc, bucket) => acc + bucket.value,
    0,
  );

  return (
    <GeneralDashboard
      bars1={{
        data: bucketSizes,
        label: 'S3 Buckets Size',
        unit: 'B',
      }}
      aggregate1={{
        label: 'Total S3 Buckets',
        value: bucketCount,
        unit: '',
      }}
      aggregate2={{
        label: 'Total Bucket Size',
        value: totalBucketSize,
        unit: 'B',
      }}
      service={ArnService.s3}
      label="Bucket Size"
    />
  );
};
