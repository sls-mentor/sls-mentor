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
};

export const SlsMentorLogo: JSX.Element = SlsMentorSvg;
export const SlsMentorLogoWhite: JSX.Element = SlsMentorSvgWhite;
