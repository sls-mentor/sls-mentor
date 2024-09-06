import { GraphData, Edge, SubnetWithRouteTable } from '@sls-mentor/graph-core';
import { ClusterPosition, NodeVisibility, NodeWithLocation } from '../types';

export const NODE_RADIUS = 15;

export type GraphState = {
  nodes: Record<string, NodeWithLocation>;
  edges: Edge[];
  hoveredNode: NodeWithLocation | undefined;
  hoveredNodeArn: string | undefined;
  connectedArns: Record<string, boolean>;
  mouseX: number;
  mouseY: number;
  nodeRadius: number;
  zoomLevel: number;
  clickedNode: NodeWithLocation | undefined;
  clickedNodeArn: string | undefined;
  clusters: Record<string, ClusterPosition>;
  subnets: Record<string, SubnetWithRouteTable>;
};

export const getInitialState = ({
  nodes,
  edges,
  vpcConfig,
}: GraphData): GraphState => {
  return {
    nodes: Object.fromEntries(
      Object.entries(nodes)
        .map(([arn, node]) => {
          const r = Math.random() * 2 * Math.PI;

          const nodeWithLocation: NodeWithLocation = {
            ...node,
            x: Math.cos(r),
            y: Math.sin(r),
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            value: undefined,
            pinned: false,
            visibility: NodeVisibility.Full,
            cluster: undefined,
          };

          return [arn, nodeWithLocation];
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
    subnets: vpcConfig.subnets,
  };
};
