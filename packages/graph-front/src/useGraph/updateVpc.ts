import { Edge } from '@sls-mentor/graph-core';
import { ClusterPosition, NodeWithLocationAndRank } from '../types';

const SPRING_CONSTANT = 0.003;
const RESISTANCE_CONSTANT = 0.1;
const REPULSION_CONSTANT = 5.5;
const MAX_ACCELERATION = 1.5;

const getRepulsionForVPC = ({
  node1,
  node2,
}: {
  node1: NodeWithLocationAndRank;
  node2: NodeWithLocationAndRank;
}): { repulsionMultiplier: number } => {
  const node1SecurityGroups = node1.vpcConfig?.SecurityGroupIds;
  const node1VpcId = node1.vpcConfig?.VpcId;

  if (node1SecurityGroups === undefined) {
    if (node1VpcId === undefined) {
      // node is not in VPC
      return { repulsionMultiplier: 1 };
    }
    // node is in VPC but not in security group
    return { repulsionMultiplier: 0.3 };
  }

  const node2SecurityGroups = node2.vpcConfig?.SecurityGroupIds;
  const node2VpcId = node2.vpcConfig?.VpcId;
  if (node2SecurityGroups === undefined) {
    if (node2VpcId === undefined) {
      // node is not in VPC
      return { repulsionMultiplier: 1 };
    }
    // node is in VPC but not in security group
    return { repulsionMultiplier: 0.3 };
  }

  const securityGroupIntersection = node1SecurityGroups.filter(sg =>
    node2SecurityGroups.includes(sg),
  );

  const repulsionMultiplier =
    node1VpcId === node2VpcId
      ? // if securityGroupIntersection is undefined, then the nodes are not in the same security group
        securityGroupIntersection.length !== 0
        ? // If the length of the intersection is equal to the length of the security groups of both nodes,
          // then they are in the same security groups
          securityGroupIntersection.length === node1SecurityGroups.length &&
          securityGroupIntersection.length === node2SecurityGroups.length
          ? 0.3
          : 0.5
        : 1
      : 2;

  return { repulsionMultiplier };
};

const computeVpcSecurityGroupClusters = ({
  nodes,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
}): Record<string, ClusterPosition> => {
  const clusters = Object.values(nodes).reduce<Record<string, ClusterPosition>>(
    (acc, node) => {
      const vpcSecurityGroups = node.vpcConfig?.SecurityGroupIds;
      if (vpcSecurityGroups === undefined) {
        return acc;
      }

      vpcSecurityGroups.forEach(vpcSecurityGroup => {
        const cluster = acc[vpcSecurityGroup];

        if (cluster === undefined) {
          acc[vpcSecurityGroup] = {
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
      });
      return acc;
    },
    {},
  );

  return Object.entries(clusters).reduce(
    (acc, [vpcSecurityGroupId, cluster]) => ({
      ...acc,
      [vpcSecurityGroupId]: {
        ...cluster,
        x: cluster.x / cluster.amount,
        y: cluster.y / cluster.amount,
        radius: 0,
      },
    }),
    {},
  );
};

export const updateVpc = ({
  nodes,
  edges,
  repulsionConstant = REPULSION_CONSTANT,
  resistanceConstant = RESISTANCE_CONSTANT,
  springConstant = SPRING_CONSTANT,
  maxAcceleration = MAX_ACCELERATION,
  clickedNodeArn,
  mouseX,
  mouseY,
  zoomLevel,
  clusters: vpcClusters,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
  edges: Edge[];
  repulsionConstant?: number;
  resistanceConstant?: number;
  springConstant?: number;
  maxAcceleration?: number;
  clickedNodeArn: string | undefined;
  mouseX: number;
  mouseY: number;
  zoomLevel: number;
  clusters: Record<string, ClusterPosition>;
}): void => {
  const vpcSecurityGroupClusters = computeVpcSecurityGroupClusters({ nodes });

  Object.keys(vpcClusters).forEach(cluster => {
    const c = vpcClusters[cluster];
    if (c !== undefined) {
      c.radius = 0;
    }
  });

  Object.values(nodes).forEach((node1, i) => {
    if (node1.visibility === 'None') {
      return;
    }

    Object.values(nodes).forEach((node2, j) => {
      if (i <= j) {
        return;
      }

      if (node2.visibility === 'None') {
        return;
      }

      const { repulsionMultiplier } = getRepulsionForVPC({
        node1,
        node2,
      });

      const distance2 =
        (node2.x - node1.x) * (node2.x - node1.x) +
        (node2.y - node1.y) * (node2.y - node1.y);

      if (node1.arn.toString() !== clickedNodeArn && !node1.pinned) {
        node1.ax -=
          (repulsionMultiplier * repulsionConstant * (node2.x - node1.x)) /
          distance2;
        node1.ay -=
          (repulsionMultiplier * repulsionConstant * (node2.y - node1.y)) /
          distance2;
      }

      if (node2.arn.toString() !== clickedNodeArn && !node2.pinned) {
        node2.ax +=
          (repulsionMultiplier * repulsionConstant * (node2.x - node1.x)) /
          distance2;
        node2.ay +=
          (repulsionMultiplier * repulsionConstant * (node2.y - node1.y)) /
          distance2;
      }
    });

    const node1SecurityGroups = node1.vpcConfig?.SecurityGroupIds;
    const node1VpcId = node1.vpcConfig?.VpcId;

    if (node1SecurityGroups !== undefined && node1VpcId !== undefined) {
      const vpcSecurityGroups = node1SecurityGroups.map(
        node1SeurityGroup => vpcSecurityGroupClusters[node1SeurityGroup],
      );

      if (vpcSecurityGroupClusters === undefined) {
        return;
      }
      vpcSecurityGroups.forEach(vpcCluster => {
        if (vpcCluster === undefined) {
          return;
        }

        node1.ax += springConstant * 2 * (vpcCluster.x - node1.x);
        node1.ay += springConstant * 2 * (vpcCluster.y - node1.y);
      });
    }

    const attractionMultiplier = 0.7;

    if (node1.arn.toString() !== clickedNodeArn && !node1.pinned) {
      node1.ax -= springConstant * node1.x * attractionMultiplier;
      node1.ay -= springConstant * node1.y * attractionMultiplier;
    }
  });

  edges.forEach(e => {
    const node1 = nodes[e.from];
    const node2 = nodes[e.to];

    if (node1 === undefined || node2 === undefined) {
      return;
    }

    if (node1.visibility === 'None' || node2.visibility === 'None') {
      return;
    }
  });

  Object.values(nodes).forEach(node => {
    if (node.pinned) {
      return;
    }

    if (node.visibility === 'None') {
      return;
    }

    if (node.arn.toString() === clickedNodeArn) {
      node.x = mouseX / zoomLevel;
      node.y = mouseY / zoomLevel;

      return;
    }

    const accelerationSquared = node.ax * node.ax + node.ay * node.ay;
    if (accelerationSquared > maxAcceleration * maxAcceleration) {
      const accelerationModule = Math.sqrt(accelerationSquared);
      node.ax /= accelerationModule / maxAcceleration;
      node.ay /= accelerationModule / maxAcceleration;
    }

    node.vx += node.ax;
    node.vy += node.ay;

    node.vx *= 1 - resistanceConstant;
    node.vy *= 1 - resistanceConstant;

    node.x += node.vx;
    node.y += node.vy;

    node.ax = 0;
    node.ay = 0;

    if (node.vpcConfig === undefined || node.vpcConfig.VpcId === undefined) {
      return;
    }

    const cluster = vpcClusters[node.vpcConfig.VpcId];

    if (cluster === undefined) {
      return;
    }

    cluster.x += node.vx / cluster.amount;
    cluster.y += node.vy / cluster.amount;

    // radius for vpc cluster
    cluster.radius = Math.max(
      cluster.radius,
      Math.sqrt(
        (node.x - cluster.x) * (node.x - cluster.x) +
          (node.y - cluster.y) * (node.y - cluster.y),
      ),
    );

    cluster.securityGroups = [];

    if (node.vpcConfig.SecurityGroupIds === undefined) {
      return;
    }

    const securityGroupClusters = node.vpcConfig.SecurityGroupIds.map(
      securityGroup => vpcSecurityGroupClusters[securityGroup],
    );

    securityGroupClusters.forEach(securityGroupCluster => {
      if (securityGroupCluster === undefined) {
        return;
      }

      securityGroupCluster.x += node.vx / securityGroupCluster.amount;
      securityGroupCluster.y += node.vy / securityGroupCluster.amount;

      securityGroupCluster.radius = Math.max(
        securityGroupCluster.radius ?? 0,
        Math.sqrt(
          (node.x - securityGroupCluster.x) *
            (node.x - securityGroupCluster.x) +
            (node.y - securityGroupCluster.y) *
              (node.y - securityGroupCluster.y),
        ),
      );

      cluster.securityGroups?.push({
        securityGroupX: securityGroupCluster.x,
        securityGroupY: securityGroupCluster.y,
        securityGroupRadius: securityGroupCluster.radius,
      });
    });
  });
};
