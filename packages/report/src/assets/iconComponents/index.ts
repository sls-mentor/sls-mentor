import { Service } from '@sls-mentor/core';
import ApiGatewayV2Svg from './ApiGatewayV2Svg';
import BackupSvg from './BackupSvg';
import CloudFrontSvg from './CloudFrontSvg';
import CloudWatchSvg from './CloudWatchSvg';
import CognitoSvg from './CognitoSvg';
import LambdaSvg from './LambdaSvg';
import RDSSvg from './RDSSvg';
import S3Svg from './S3Svg';
import SQSSvg from './SQSSvg';
import EventBridgeSvg from './EventBridgeSvg';
import SlsMentorSvg from './SlsMentorSvg';
import SESSvg from './SESSvg';
import SNSSvg from './SNSSvg';

export const AwsIcons: Record<Service, JSX.Element> = {
  ApiGatewayV2: ApiGatewayV2Svg,
  Backup: BackupSvg,
  CloudFront: CloudFrontSvg,
  CloudWatch: CloudWatchSvg,
  EventBridge: EventBridgeSvg,
  Cognito: CognitoSvg,
  Lambda: LambdaSvg,
  RDS: RDSSvg,
  S3: S3Svg,
  SQS: SQSSvg,
  SES: SESSvg,
  SNS: SNSSvg,
};

export const SlsMentorIcon: JSX.Element = SlsMentorSvg;
