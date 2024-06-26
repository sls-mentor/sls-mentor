import ApiGatewaySvg from './ApiGatewaySvg';
import BackupSvg from './BackupSvg';
import CloudFrontSvg from './CloudFrontSvg';
import CloudWatchSvg from './CloudWatchSvg';
import CognitoSvg from './CognitoSvg';
import DynamoDBSvg from './DynamoDBSvg';
import LambdaSvg from './LambdaSvg';
import RDSSvg from './RDSSvg';
import S3Svg from './S3Svg';
import SQSSvg from './SQSSvg';
import EventBridgeSvg from './EventBridgeSvg';
import SESSvg from './SESSvg';
import SlsMentorSvg from './SlsMentorSvg';
import SNSSvg from './SNSSvg';
import IAMSvg from './IAMSvg';
import { ArnService } from '@sls-mentor/arn';
import SlsMentorSvgWhite from './SlsMentorSvgWhite';
import StepFunctionSvg from './StepFunctionSvg';
import AppSyncSvg from './AppSyncSvg';
import SecretsManagerSvg from './SecretsManagerSvg';
import CloudformationSvg from './CloudformationSvg';
import NatGatewaySvg from './NatGatewaySvg';

import EmptyLambdaSvg from './EmptyLambdaSvg';
import EmptyDynamoDBSvg from './EmptyDynamoDBSvg';
import EmptyS3Svg from './EmptyS3Svg';

export const ArnAwsIcons: Record<ArnService, JSX.Element> = {
  apigateway: ApiGatewaySvg,
  cloudfront: CloudFrontSvg,
  dynamodb: DynamoDBSvg,
  events: EventBridgeSvg,
  'cognito-idp': CognitoSvg,
  lambda: LambdaSvg,
  rds: RDSSvg,
  s3: S3Svg,
  sqs: SQSSvg,
  ses: SESSvg,
  sns: SNSSvg,
  iam: IAMSvg,
  backup: BackupSvg,
  logs: CloudWatchSvg,
  states: StepFunctionSvg,
  appsync: AppSyncSvg,
  secretsmanager: SecretsManagerSvg,
  cloudformation: CloudformationSvg,
  ec2: NatGatewaySvg,
};

export const EmptyArnAwsIcon: Record<ArnService, JSX.Element> = {
  apigateway: EmptyLambdaSvg,
  cloudfront: EmptyLambdaSvg,
  dynamodb: EmptyDynamoDBSvg,
  events: EmptyLambdaSvg,
  'cognito-idp': EmptyLambdaSvg,
  lambda: EmptyLambdaSvg,
  rds: EmptyLambdaSvg,
  s3: EmptyS3Svg,
  sqs: EmptyLambdaSvg,
  ses: EmptyLambdaSvg,
  sns: EmptyLambdaSvg,
  iam: EmptyLambdaSvg,
  backup: EmptyLambdaSvg,
  logs: EmptyLambdaSvg,
  states: EmptyLambdaSvg,
  appsync: EmptyLambdaSvg,
  secretsmanager: EmptyLambdaSvg,
  cloudformation: EmptyLambdaSvg,
  ec2: EmptyLambdaSvg,
};

export const SlsMentorLogo: JSX.Element = SlsMentorSvg;
export const SlsMentorLogoWhite: JSX.Element = SlsMentorSvgWhite;
