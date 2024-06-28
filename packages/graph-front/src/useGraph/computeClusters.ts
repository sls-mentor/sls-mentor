import { ClusterPosition, NodeWithLocation } from '../types';

const computeTagClusters = ({
  nodes,
  clusteringByTagValue,
}: {
  nodes: Record<string, NodeWithLocation>;
  clusteringByTagValue: string;
}): Record<string, ClusterPosition> => {
  const clusters = Object.values(nodes).reduce<Record<string, ClusterPosition>>(
    (acc, node) => {
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
          radius: 0,
        };

        return acc;
      }

      cluster.amount += 1;
      cluster.x += node.x;
      cluster.y += node.y;

      return acc;
    },
    {},
  );

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
  nodes: Record<string, NodeWithLocation>;
}): Record<string, ClusterPosition> => {
  const clusters = Object.values(nodes).reduce<Record<string, ClusterPosition>>(
    (acc, node) => {
      if (node.cloudformationStack === undefined) {
        return acc;
      }

      const cluster = acc[node.cloudformationStack];

      if (cluster === undefined) {
        acc[node.cloudformationStack] = {
          amount: 1,
          x: node.x,
          y: node.y,
          radius: 0,
        };

        return acc;
      }

      cluster.amount += 1;
      cluster.x += node.x;
      cluster.y += node.y;

      return acc;
    },
    {},
  );

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

const computeVpcClusters = ({
  nodes,
}: {
  nodes: Record<string, NodeWithLocation>;
}): Record<string, ClusterPosition> => {
  const clusters = Object.values(nodes).reduce<Record<string, ClusterPosition>>(
    (acc, node) => {
      const vpcId = node.vpcConfig?.VpcId;
      if (vpcId === undefined) {
        return acc;
      }

      const cluster = acc[vpcId];

      if (cluster === undefined) {
        acc[vpcId] = {
          amount: 1,
          x: node.x,
          y: node.y,
          radius: 0,
        };

        return acc;
      }

      cluster.amount += 1;
      cluster.x += node.x;
      cluster.y += node.y;

      return acc;
    },
    {},
  );

  return Object.entries(clusters).reduce(
    (acc, [vpcId, cluster]) => ({
      ...acc,
      [vpcId]: {
        ...cluster,
        x: cluster.x / cluster.amount,
        y: cluster.y / cluster.amount,
        radius: 0,
      },
    }),
    {},
  );
};

export const computeClusters = ({
  nodes,
  clusteringByTagValue,
  enableCloudformationClustering,
  enableVpcClustering,
}: {
  nodes: Record<string, NodeWithLocation>;
  clusteringByTagValue: string | undefined;
  enableCloudformationClustering: boolean;
  enableVpcClustering: boolean;
}): Record<string, ClusterPosition> => {
  if (clusteringByTagValue !== undefined) {
    return computeTagClusters({ nodes, clusteringByTagValue });
  }

  if (enableCloudformationClustering) {
    return computeCloudformationStackClusters({ nodes });
  }

  if (enableVpcClustering) {
    return computeVpcClusters({ nodes });
  }

  return {};
};

export const getNodeCluster = ({
  node,
  clusteringByTagValue,
  enableCloudformationClustering,
  enableVpcClustering,
}: {
  node: NodeWithLocation;
  clusteringByTagValue: string | undefined;
  enableCloudformationClustering: boolean;
  enableVpcClustering: boolean;
}): string | undefined => {
  if (clusteringByTagValue !== undefined) {
    return node.tags[clusteringByTagValue];
  }

  if (enableCloudformationClustering) {
    return node.cloudformationStack;
  }

  if (enableVpcClustering) {
    return node.vpcConfig?.VpcId;
  }

  return undefined;
};
