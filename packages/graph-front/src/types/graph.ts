import { Node } from '@sls-mentor/graph-core';

type NodeWithLocation = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
} & Node;

export type NodeWithLocationAndRank = NodeWithLocation & {
  rank?: number;
  value?: number;
  pinned: boolean;
};
