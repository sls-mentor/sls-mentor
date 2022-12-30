import {
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  EventBridgeEventBusARN,
  GuardianARN,
  LambdaFunctionARN,
  S3BucketARN,
  SqsQueueARN,
} from '../../types';
import { CloudFrontDistributionARN } from '../../types/arn/cloudFront';
import { listCloudFrontDistributions } from './cloudfront';
import { listCloudwatchLogGroups } from './cloudwatch';
import { listCognitoUserPools } from './cognito';
import { listEventBridgeEventBuses } from './eventBridge';
import { listLambdaFunctions } from './lambda';
import { listS3Buckets } from './s3';
import { listSqsQueues } from './sqs';

export const listAllResources = async (): Promise<GuardianARN[]> => {
  const s3buckets: S3BucketARN[] = await listS3Buckets();
  const lambdaFunctions: LambdaFunctionARN[] = await listLambdaFunctions();
  const sqsQueues: SqsQueueARN[] = await listSqsQueues();
  const cognitoUserPools: CognitoUserPoolARN[] = await listCognitoUserPools();
  const cloudWatchLogGroups: CloudwatchLogGroupARN[] =
    await listCloudwatchLogGroups();
  const eventBridgeEventBuses: EventBridgeEventBusARN[] =
    await listEventBridgeEventBuses();
  const cloudFrontDistributions: CloudFrontDistributionARN[] =
    await listCloudFrontDistributions();

  return [
    ...s3buckets,
    ...lambdaFunctions,
    ...sqsQueues,
    ...cognitoUserPools,
    ...cloudWatchLogGroups,
    ...eventBridgeEventBuses,
    ...cloudFrontDistributions,
  ];
};
