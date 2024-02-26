import { NodeWithLocationAndRank } from '../types';

const computeTagClusters = ({
  nodes,
  clusteringByTagValue,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
  clusteringByTagValue: string;
}): Record<string, { amount: number; x: number; y: number }> => {
  const clusters = Object.values(nodes).reduce<
    Record<string, { amount: number; x: number; y: number }>
  >((acc, node) => {
    const tagValue = node.tags[clusteringByTagValue];

    if (tagValue === undefined) {
      return acc;
    }

    const cluster = acc[tagValue];

    if (cluster === undefined) {
      acc[tagValue] = {
        amount: 1,
        x: node.x,
        y: node.y,
      };

      return acc;
    }

    cluster.amount += 1;
    cluster.x += node.x;
    cluster.y += node.y;

    return acc;
  }, {});

  return Object.entries(clusters).reduce(
    (acc, [tagValue, cluster]) => ({
      ...acc,
      [tagValue]: {
        ...cluster,
        x: cluster.x / cluster.amount,
        y: cluster.y / cluster.amount,
      },
    }),
    {},
  );
};

const computeCloudformationStackClusters = ({
  nodes,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
}): Record<string, { amount: number; x: number; y: number }> => {
  const clusters = Object.values(nodes).reduce<
    Record<string, { amount: number; x: number; y: number }>
  >((acc, node) => {
    if (node.cloudformationStack === undefined) {
      return acc;
    }

    const cluster = acc[node.cloudformationStack];

    if (cluster === undefined) {
      acc[node.cloudformationStack] = {
        amount: 1,
        x: node.x,
        y: node.y,
      };

      return acc;
    }

    cluster.amount += 1;
    cluster.x += node.x;
    cluster.y += node.y;

    return acc;
  }, {});

  return Object.entries(clusters).reduce(
    (acc, [cloudformationStack, cluster]) => ({
      ...acc,
      [cloudformationStack]: {
        ...cluster,
        x: cluster.x / cluster.amount,
        y: cluster.y / cluster.amount,
      },
    }),
    {},
  );
};

export const computeClusters = ({
  nodes,
  clusteringByTagValue,
  enableCloudformationClustering,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
  clusteringByTagValue: string | undefined;
  enableCloudformationClustering: boolean;
}): Record<string, { amount: number; x: number; y: number }> => {
  if (clusteringByTagValue !== undefined) {
    return computeTagClusters({ nodes, clusteringByTagValue });
  }

  if (enableCloudformationClustering) {
    return computeCloudformationStackClusters({ nodes });
  }

  return {};
};

export const getNodeCluster = ({
  node,
  clusteringByTagValue,
  enableCloudformationClustering,
}: {
  node: NodeWithLocationAndRank;
  clusteringByTagValue: string | undefined;
  enableCloudformationClustering: boolean;
}): string | undefined => {
  if (clusteringByTagValue !== undefined) {
    return node.tags[clusteringByTagValue];
  }

  if (enableCloudformationClustering) {
    return node.cloudformationStack;
  }

  return undefined;
};
