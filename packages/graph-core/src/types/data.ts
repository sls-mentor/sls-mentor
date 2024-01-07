import { LambdaFunctionARN, SupportedARN } from '@sls-mentor/arn';

import { LambdaFunctionStats } from '../nodes';
import { NodeBase, SerializedNodeBase } from './helpers';

export type Edge = {
  from: string;
  to: string;
};

export type Node =
  | NodeBase<LambdaFunctionARN, LambdaFunctionStats>
  | NodeBase<Exclude<SupportedARN, LambdaFunctionARN>>;

export type SerializedNode =
  | SerializedNodeBase<LambdaFunctionStats>
  | SerializedNodeBase;

export type GraphData = {
  nodes: { [arn: string]: Node };
  edges: Edge[];
};

export type SerializedGraphData = {
  nodes: { [arn: string]: SerializedNode };
  edges: Edge[];
};
