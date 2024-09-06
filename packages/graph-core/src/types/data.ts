import {
  DynamoDBTableARN,
  LambdaFunctionARN,
  S3BucketARN,
  SupportedARN,
} from '@sls-mentor/arn';
import {
  SubnetType,
  type SubnetWithRouteTable,
  VpcInfo,
} from '@sls-mentor/aws-api';

import { HttpApiWarnings, RestApiWarnings } from 'edges/apiGateway/types';
import { BaseEdge } from 'edges/types';
import { S3BucketStats } from 'nodes/s3/types';

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
export type S3BucketNode = NodeBase<S3BucketARN, S3BucketStats>;

export type Node =
  | LambdaFunctionNode
  | DynamoDBTableNode
  | S3BucketNode
  | NodeBase<Exclude<SupportedARN, LambdaFunctionARN | DynamoDBTableARN>>;

export type SerializedNode =
  | SerializedNodeBase<LambdaFunctionStats>
  | SerializedNodeBase<DynamoDBTableStats>
  | SerializedNodeBase<S3BucketStats>
  | SerializedNodeBase;

export type GraphData = {
  nodes: { [arn: string]: Node };
  edges: Edge[];
  tags: { Key?: string; Value?: string }[];
  cloudformationStacks: string[];
  vpcConfig: {
    vpcs: { [vpcId: string]: VpcInfo };
    subnets: { [subnetId: string]: SubnetWithRouteTable };
  };
};

export type SerializedGraphData = {
  nodes: { [arn: string]: SerializedNode };
  edges: Edge[];
  tags: { Key?: string; Value?: string }[];
  cloudformationStacks: string[];
  vpcConfig: {
    vpcs: { [vpcId: string]: VpcInfo };
    subnets: { [subnetId: string]: SubnetWithRouteTable };
  };
};

export { SubnetType, SubnetWithRouteTable };
