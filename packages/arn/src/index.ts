import { CloudformationStackARN } from 'cloudformation';

import { CustomARN } from './CustomARN';
import { ApiGatewayHttpApiARN, ApiGatewayRestApiARN } from './apiGateway';
import { AppSyncApiARN } from './appSync';
import { BackupPlanARN } from './backup';
import { CloudFrontDistributionARN } from './cloudFront';
import { CloudwatchLogGroupARN } from './cloudwatch';
import { CognitoUserPoolARN } from './cognito';
import { DynamoDBTableARN } from './dynamodb';
import { EventBridgeEventBusARN, EventBridgeRuleARN } from './eventBridge';
import { IamRoleARN } from './iam';
import { LambdaFunctionARN } from './lambda';
import { RdsClusterARN, RdsInstanceARN } from './rds';
import { S3BucketARN } from './s3';
import { SecretsManagerSecretARN } from './secretsManager';
import { SESConfigurationSetARN, SESIdentityARN } from './ses';
import { SnsSubscriptionARN, SnsTopicARN } from './sns';
import { SqsQueueARN } from './sqs';
import { StepFunctionStateMachineARN } from './stepFunction';
import { VpcNatGatewayARN } from './vpc';

export type SupportedARN =
  | ApiGatewayHttpApiARN
  | ApiGatewayRestApiARN
  | AppSyncApiARN
  | BackupPlanARN
  | CloudFrontDistributionARN
  | CloudwatchLogGroupARN
  | CognitoUserPoolARN
  | DynamoDBTableARN
  | EventBridgeEventBusARN
  | EventBridgeRuleARN
  | IamRoleARN
  | LambdaFunctionARN
  | RdsClusterARN
  | RdsInstanceARN
  | S3BucketARN
  | SESConfigurationSetARN
  | SESIdentityARN
  | SnsSubscriptionARN
  | SnsTopicARN
  | SqsQueueARN
  | StepFunctionStateMachineARN
  | SecretsManagerSecretARN
  | CloudformationStackARN
  | VpcNatGatewayARN;

export {
  ApiGatewayHttpApiARN,
  ApiGatewayRestApiARN,
  AppSyncApiARN,
  BackupPlanARN,
  CloudFrontDistributionARN,
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  DynamoDBTableARN,
  EventBridgeEventBusARN,
  EventBridgeRuleARN,
  IamRoleARN,
  LambdaFunctionARN,
  RdsClusterARN,
  RdsInstanceARN,
  S3BucketARN,
  SESConfigurationSetARN,
  SESIdentityARN,
  SnsSubscriptionARN,
  SnsTopicARN,
  SqsQueueARN,
  StepFunctionStateMachineARN,
  SecretsManagerSecretARN,
  CustomARN,
  CloudformationStackARN,
  VpcNatGatewayARN,
};

export * from './types';

// eslint-disable-next-line complexity
export const getRefinedArn = (arn: CustomARN): SupportedARN => {
  switch (true) {
    case ApiGatewayHttpApiARN.is(arn):
      return ApiGatewayHttpApiARN.fromCustomARN(arn);
    case ApiGatewayRestApiARN.is(arn):
      return ApiGatewayRestApiARN.fromCustomARN(arn);
    case AppSyncApiARN.is(arn):
      return AppSyncApiARN.fromCustomARN(arn);
    case BackupPlanARN.is(arn):
      return BackupPlanARN.fromCustomARN(arn);
    case CloudFrontDistributionARN.is(arn):
      return CloudFrontDistributionARN.fromCustomARN(arn);
    case CloudwatchLogGroupARN.is(arn):
      return CloudwatchLogGroupARN.fromCustomARN(arn);
    case CognitoUserPoolARN.is(arn):
      return CognitoUserPoolARN.fromCustomARN(arn);
    case DynamoDBTableARN.is(arn):
      return DynamoDBTableARN.fromCustomARN(arn);
    case EventBridgeEventBusARN.is(arn):
      return EventBridgeEventBusARN.fromCustomARN(arn);
    case EventBridgeRuleARN.is(arn):
      return EventBridgeRuleARN.fromCustomARN(arn);
    case IamRoleARN.is(arn):
      return IamRoleARN.fromCustomARN(arn);
    case LambdaFunctionARN.is(arn):
      return LambdaFunctionARN.fromCustomARN(arn);
    case RdsClusterARN.is(arn):
      return RdsClusterARN.fromCustomARN(arn);
    case RdsInstanceARN.is(arn):
      return RdsInstanceARN.fromCustomARN(arn);
    case S3BucketARN.is(arn):
      return S3BucketARN.fromCustomARN(arn);
    case SESConfigurationSetARN.is(arn):
      return SESConfigurationSetARN.fromCustomARN(arn);
    case SESIdentityARN.is(arn):
      return SESIdentityARN.fromCustomARN(arn);
    case SnsSubscriptionARN.is(arn):
      return SnsSubscriptionARN.fromCustomARN(arn);
    case SnsTopicARN.is(arn):
      return SnsTopicARN.fromCustomARN(arn);
    case SqsQueueARN.is(arn):
      return SqsQueueARN.fromCustomARN(arn);
    case StepFunctionStateMachineARN.is(arn):
      return StepFunctionStateMachineARN.fromCustomARN(arn);
    case SecretsManagerSecretARN.is(arn):
      return SecretsManagerSecretARN.fromCustomARN(arn);
    case CloudformationStackARN.is(arn):
      return CloudformationStackARN.fromCustomARN(arn);
    case VpcNatGatewayARN.is(arn):
      return VpcNatGatewayARN.fromCustomARN(arn);
    default:
      throw new Error(`Missing implementation for ARN ${arn.toString()}`);
  }
};
