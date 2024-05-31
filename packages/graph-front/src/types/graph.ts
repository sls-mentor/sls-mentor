import { Node } from '@sls-mentor/graph-core';

export const NodeVisibility = {
  Full: 'Full',
  Partial: 'Partial',
  None: 'None',
} as const;
export type NodeVisibility =
  (typeof NodeVisibility)[keyof typeof NodeVisibility];

export type NodeWithLocation = Node & {
  value?: number;
  pinned: boolean;
  visibility: NodeVisibility;
  cluster: string | undefined;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
};

export type ClusterPosition = {
  amount: number;
  x: number;
  y: number;
  radius: number;
  securityGroups?: {
    securityGroupRadius: number;
    securityGroupX: number;
    securityGroupY: number;
  }[];
};
