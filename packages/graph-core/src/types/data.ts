import {
  DynamoDBTableARN,
  LambdaFunctionARN,
  SupportedARN,
} from '@sls-mentor/arn';

import { DynamoDBTableStats, LambdaFunctionStats } from '../nodes';
import { NodeBase, SerializedNodeBase } from './helpers';

export type Edge = {
  from: string;
  to: string;
};

export type LambdaFunctionNode = NodeBase<
  LambdaFunctionARN,
  LambdaFunctionStats
>;

export type DynamoDBTableNode = NodeBase<DynamoDBTableARN, DynamoDBTableStats>;

export type Node =
  | LambdaFunctionNode
  | DynamoDBTableNode
  | NodeBase<Exclude<SupportedARN, LambdaFunctionARN | DynamoDBTableARN>>;

export type SerializedNode =
  | SerializedNodeBase<LambdaFunctionStats>
  | SerializedNodeBase<DynamoDBTableStats>
  | SerializedNodeBase;

export type GraphData = {
  nodes: { [arn: string]: Node };
  edges: Edge[];
};

export type SerializedGraphData = {
  nodes: { [arn: string]: SerializedNode };
  edges: Edge[];
};
