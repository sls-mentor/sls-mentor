import { GraphData, Edge } from '@sls-mentor/graph-core';
import {
  ClusterPosition,
  NodeVisibility,
  NodeWithLocationAndRank,
} from '../types';

export const NODE_RADIUS = 15;

export type GraphState = {
  nodes: Record<string, NodeWithLocationAndRank>;
  edges: Edge[];
  hoveredNode: NodeWithLocationAndRank | undefined;
  hoveredNodeArn: string | undefined;
  connectedArns: Record<string, boolean>;
  mouseX: number;
  mouseY: number;
  nodeRadius: number;
  zoomLevel: number;
  clickedNode: NodeWithLocationAndRank | undefined;
  clickedNodeArn: string | undefined;
  clusters: Record<string, ClusterPosition>;
};

export const getInitialState = ({ nodes, edges }: GraphData): GraphState => {
  return {
    nodes: Object.fromEntries(
      Object.entries(nodes)
        .map(([arn, node]) => {
          const r = Math.random() * 2 * Math.PI;

          const nodeWithLocationAndRank: NodeWithLocationAndRank = {
            ...node,
            x: Math.cos(r),
            y: Math.sin(r),
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            rank: undefined,
            value: undefined,
            pinned: false,
            visibility: NodeVisibility.Full,
            cluster: undefined,
          };

          return [arn, nodeWithLocationAndRank];
        })
        .filter(([, node]) => node !== undefined),
    ),
    edges,
    hoveredNode: undefined,
    hoveredNodeArn: undefined,
    connectedArns: {},
    mouseX: 0,
    mouseY: 0,
    nodeRadius: NODE_RADIUS,
    zoomLevel: 1,
    clickedNode: undefined,
    clickedNodeArn: undefined,
    clusters: {},
  };
};
