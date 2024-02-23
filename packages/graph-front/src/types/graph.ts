import { Node } from '@sls-mentor/graph-core';

type NodeWithLocation = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
} & Node;

export const NodeVisibility = {
  Full: 'Full',
  Partial: 'Partial',
  None: 'None',
} as const;
export type NodeVisibility =
  (typeof NodeVisibility)[keyof typeof NodeVisibility];

export type NodeWithLocationAndRank = NodeWithLocation & {
  rank?: number;
  value?: number;
  pinned: boolean;
  visibility: NodeVisibility;
  cluster: string | undefined;
};
