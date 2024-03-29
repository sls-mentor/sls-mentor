import {
  DynamoDBTableARN,
  LambdaFunctionARN,
  SupportedARN,
} from '@sls-mentor/arn';

import { HttpApiWarnings, RestApiWarnings } from 'edges/apiGateway/types';
import { BaseEdge } from 'edges/types';

import { DynamoDBTableStats, LambdaFunctionStats } from '../nodes';
import { NodeBase, SerializedNodeBase } from './helpers';

export const CloudFormationWarnings = {
  CircularDependencies: 'CircularDependencies',
} as const;

export type CircularDependenciesWarnings =
  (typeof CloudFormationWarnings)[keyof typeof CloudFormationWarnings];

type Warnings =
  | RestApiWarnings
  | HttpApiWarnings
  | CircularDependenciesWarnings;

export type Edge = BaseEdge & {
  warnings: Warnings[];
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
