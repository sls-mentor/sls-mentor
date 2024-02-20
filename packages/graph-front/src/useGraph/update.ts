import { Edge } from '@sls-mentor/graph-core';
import { NodeWithLocationAndRank } from '../types';

const SPRING_CONSTANT = 0.003;
const RESISTANCE_CONSTANT = 0.1;
const REPULSION_CONSTANT = 5.5;
const MAX_ACCELERATION = 1.5;

/**
 * @param nodes Nodes to simulate
 * @param edges Edges to simulate
 * @param repulsionConstant Repulsion constant (default: 5.5) - how much nodes repel each other 0 -> 100
 * @param resistanceConstant Resistance constant (default: 0.1) - how much nodes resist movement 0 -> 1
 * @param springConstant Spring constant (default: 0.003) - how much edges pull nodes together 0 -> 0.1
 * @param maxAcceleration Max acceleration (default: 1) - how much nodes can accelerate 0 -> 10
 */
export const update = ({
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
  clusteringEnabled = true,
  clusters,
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
  clusteringEnabled?: boolean;
  clusters: Record<string, { amount: number; x: number; y: number }>;
}): void => {
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

      const node1Stack = node1.cloudformationStack;
      const node2Stack = node2.cloudformationStack;

      const repulsionMultiplier =
        clusteringEnabled &&
        node1Stack &&
        node2Stack &&
        node1Stack !== node2Stack
          ? 2
          : 1;

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

    if (clusteringEnabled && node1.cloudformationStack !== undefined) {
      const cluster = clusters[node1.cloudformationStack];

      if (cluster === undefined) {
        return;
      }

      node1.ax += springConstant * (cluster.x - node1.x);
      node1.ay += springConstant * (cluster.y - node1.y);
    }

    const attractionMultiplier = clusteringEnabled ? 0.7 : 1;

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

    const node1Stack = node1.cloudformationStack;
    const node2Stack = node2.cloudformationStack;

    if (clusteringEnabled && node1Stack !== node2Stack) {
      return;
    }

    if (node1.arn.toString() !== clickedNodeArn && !node1.pinned) {
      node1.ax += springConstant * (node2.x - node1.x);
      node1.ay += springConstant * (node2.y - node1.y);
    }

    if (node2.arn.toString() !== clickedNodeArn && !node2.pinned) {
      node2.ax += springConstant * (node1.x - node2.x);
      node2.ay += springConstant * (node1.y - node2.y);
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

    if (node.cloudformationStack === undefined) {
      return;
    }

    const cluster = clusters[node.cloudformationStack];

    if (cluster === undefined) {
      return;
    }

    cluster.x += node.vx / cluster.amount;
    cluster.y += node.vy / cluster.amount;
  });
};
