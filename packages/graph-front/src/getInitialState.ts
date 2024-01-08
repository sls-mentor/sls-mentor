import { GraphData, Edge } from '@sls-mentor/graph-core';
import { NodeWithLocation } from './types';
import { CustomARN } from '@sls-mentor/arn';

export const getInitialState = ({
  nodes,
  edges,
}: GraphData): {
  nodes: Record<string, NodeWithLocation>;
  edges: Edge[];
  hoveredNode: NodeWithLocation | undefined;
  hoveredNodeArn: string | undefined;
  connectedArns: Record<string, boolean>;
  mouseX: number;
  mouseY: number;
} => {
  return {
    nodes: Object.fromEntries(
      Object.entries(nodes)
        .map(([arn, node]) => {
          const parsedArn = CustomARN.fromArnString(arn);

          if (parsedArn === undefined) {
            return [arn, undefined];
          }

          const r = Math.random() * 2 * Math.PI;

          return [
            arn,
            {
              ...node,
              x: Math.cos(r),
              y: Math.sin(r),
              vx: 0,
              vy: 0,
              ax: 0,
              ay: 0,
              parsedArn,
            },
          ];
        })
        .filter(([, node]) => node !== undefined) as [
        string,
        NodeWithLocation,
      ][],
    ),
    edges,
    hoveredNode: undefined,
    hoveredNodeArn: undefined,
    connectedArns: {},
    mouseX: 0,
    mouseY: 0,
  };
};
