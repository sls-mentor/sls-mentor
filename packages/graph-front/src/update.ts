import { Edge } from '@sls-mentor/graph-core';
import { NodeWithLocation } from './types';

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
}: {
  nodes: Record<string, NodeWithLocation>;
  edges: Edge[];
  repulsionConstant?: number;
  resistanceConstant?: number;
  springConstant?: number;
  maxAcceleration?: number;
}): void => {
  Object.values(nodes).forEach((node1, i) => {
    Object.values(nodes).forEach((node2, j) => {
      if (i <= j) {
        return;
      }

      const distance2 =
        (node2.x - node1.x) * (node2.x - node1.x) +
        (node2.y - node1.y) * (node2.y - node1.y);

      node1.ax -= (repulsionConstant * (node2.x - node1.x)) / distance2;
      node1.ay -= (repulsionConstant * (node2.y - node1.y)) / distance2;

      node2.ax += (repulsionConstant * (node2.x - node1.x)) / distance2;
      node2.ay += (repulsionConstant * (node2.y - node1.y)) / distance2;
    });

    node1.ax -= springConstant * node1.x;
    node1.ay -= springConstant * node1.y;
  });

  edges.forEach(e => {
    const node1 = nodes[e.from];
    const node2 = nodes[e.to];

    if (node1 === undefined || node2 === undefined) {
      return;
    }

    node1.ax += springConstant * (node2.x - node1.x);
    node1.ay += springConstant * (node2.y - node1.y);

    node2.ax += springConstant * (node1.x - node2.x);
    node2.ay += springConstant * (node1.y - node2.y);
  });

  Object.values(nodes).forEach(node => {
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
  });
};
