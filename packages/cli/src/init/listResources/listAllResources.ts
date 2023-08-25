import {
  ApiGatewayV2ApiARN,
  BackupPlanARN,
  CloudFrontDistributionARN,
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  CustomARN,
  DynamoDBTableARN,
  EventBridgeEventBusARN,
  LambdaFunctionARN,
  RdsInstanceARN,
  RestApiGatewayApiARN,
  S3BucketARN,
  SESConfigurationSetARN,
  SESIdentityARN,
  SnsSubscriptionARN,
  SnsTopicARN,
  SqsQueueARN,
} from '@sls-mentor/core';
import { listApiGatewaysV2, listRestApiGateways } from './apiGateway';
import { listBackupPlans } from './backupPlan';
import { listCloudFrontDistributions } from './cloudfront';
import { listCloudwatchLogGroups } from './cloudwatch';
import { listCognitoUserPools } from './cognito';
import { listEventBridgeEventBuses } from './eventBridge';
import { listLambdaFunctions } from './lambda';
import { listRdsInstances } from './rds';
import { listS3Buckets } from './s3';
import { listSESConfigurationSets, listSESIdentities } from './ses';
import { listSnsSubscriptions } from './sns/listSnsSubscriptions';
import { listSnsTopics } from './sns/listSnsTopics';
import { listSqsQueues } from './sqs';
import { listDynamoDBTables } from './dynamoDB';

export const listAllResources = async (): Promise<CustomARN[]> => {
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
  const rdsInstances: RdsInstanceARN[] = await listRdsInstances();
  const backupPlans: BackupPlanARN[] = await listBackupPlans();
  const apiGatewaysV2: ApiGatewayV2ApiARN[] = await listApiGatewaysV2();
  const sesIdentities: SESIdentityARN[] = await listSESIdentities();
  const snsTopics: SnsTopicARN[] = await listSnsTopics();
  const snsSubscriptions: SnsSubscriptionARN[] = await listSnsSubscriptions();
  const sesConfigurationSets: SESConfigurationSetARN[] =
    await listSESConfigurationSets();
  const restApiGateways: RestApiGatewayApiARN[] = await listRestApiGateways();
  const dynamoDBTables: DynamoDBTableARN[] = await listDynamoDBTables();

  return [
    ...s3buckets,
    ...lambdaFunctions,
    ...sqsQueues,
    ...cognitoUserPools,
    ...cloudWatchLogGroups,
    ...eventBridgeEventBuses,
    ...cloudFrontDistributions,
    ...rdsInstances,
    ...backupPlans,
    ...apiGatewaysV2,
    ...sesIdentities,
    ...snsTopics,
    ...snsSubscriptions,
    ...sesConfigurationSets,
    ...restApiGateways,
    ...dynamoDBTables,
  ];
};
