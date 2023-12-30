import { CustomARN } from '@sls-mentor/arn';
import { Node } from '@sls-mentor/graph-core';

export type NodeWithLocation = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  parsedArn: CustomARN;
} & Node;
