import { Edge } from '@sls-mentor/graph-core';
import { NodeWithLocationAndRank } from './types';

const RESISTANCE_CONSTANT = 0.1;
const MAX_ACCELERATION = 1.5;
const SPRING_CONSTANT = 0.003;

export const OFFSET = 48;

/**
 * @param nodes Nodes to simulate
 * @param edges Edges to simulate
 * @param resistanceConstant Resistance constant (default: 0.1) - how much nodes resist movement 0 -> 1
 * @param maxAcceleration Max acceleration (default: 1) - how much nodes can accelerate 0 -> 10
 */
export const updateWithRank = ({
  nodes,
  springConstant = SPRING_CONSTANT,
  resistanceConstant = RESISTANCE_CONSTANT,
  maxAcceleration = MAX_ACCELERATION,
  clientWidth,
  clientHeight,
}: {
  nodes: Record<string, NodeWithLocationAndRank>;
  edges: Edge[];
  repulsionConstant?: number;
  resistanceConstant?: number;
  springConstant?: number;
  maxAcceleration?: number;
  clientWidth: number;
  clientHeight: number;
}): void => {
  const offsetClientHeight = clientHeight - OFFSET;

  const maxRankRoot = Math.ceil(
    Math.sqrt(
      Object.values(nodes).filter(({ rank }) => rank !== undefined).length,
    ),
  );

  Object.values(nodes).forEach(node1 => {
    const rank = node1.rank;

    if (rank === undefined) {
      return;
    }

    node1.ax -=
      springConstant *
      (node1.x -
        (-clientWidth / 2 +
          (rank % maxRankRoot) * (clientWidth / maxRankRoot) +
          clientWidth / (2 * maxRankRoot)));
    node1.ay -=
      springConstant *
      (node1.y -
        (OFFSET -
          clientHeight / 2 +
          Math.floor(rank / maxRankRoot) * (offsetClientHeight / maxRankRoot) +
          offsetClientHeight / (2 * maxRankRoot)));
  });

  Object.values(nodes).forEach(node => {
    // Limit acceleration magnitude to maxAcceleration
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
