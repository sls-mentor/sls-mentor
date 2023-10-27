import { Service } from '@sls-mentor/rules';
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
import SlsMentorSvg from './SlsMentorSvg';
import SESSvg from './SESSvg';
import SNSSvg from './SNSSvg';
import IAMSvg from './IAMSvg';

export const AwsIcons: Record<Service, JSX.Element> = {
  ApiGateway: ApiGatewaySvg,
  Backup: BackupSvg,
  CloudFront: CloudFrontSvg,
  CloudWatch: CloudWatchSvg,
  DynamoDB: DynamoDBSvg,
  EventBridge: EventBridgeSvg,
  Cognito: CognitoSvg,
  Lambda: LambdaSvg,
  RDS: RDSSvg,
  S3: S3Svg,
  SQS: SQSSvg,
  SES: SESSvg,
  SNS: SNSSvg,
  IAM: IAMSvg,
};

export const SlsMentorIcon: JSX.Element = SlsMentorSvg;
