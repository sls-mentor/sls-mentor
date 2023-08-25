import {
  ApiGatewayHttpApiARN,
  ApiGatewayRestApiARN,
  BackupPlanARN,
  CloudFrontDistributionARN,
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  CustomARN,
  DynamoDBTableARN,
  EventBridgeEventBusARN,
  IamRoleARN,
  LambdaFunctionARN,
  RdsInstanceARN,
  S3BucketARN,
  SESConfigurationSetARN,
  SESIdentityARN,
  SnsSubscriptionARN,
  SnsTopicARN,
  SqsQueueARN,
} from '@sls-mentor/arn';

import {
  listApiGatewaysV2,
  listBackupPlans,
  listCloudFrontDistributions,
  listCloudwatchLogGroups,
  listCognitoUserPools,
  listDynamoDBTables,
  listEventBridgeEventBuses,
  listIamRoles,
  listLambdaFunctions,
  listRdsInstances,
  listRestApiGateways,
  listS3Buckets,
  listSESConfigurationSets,
  listSESIdentities,
  listSnsSubscriptions,
  listSnsTopics,
  listSqsQueues,
} from './services';

export const listAllResourcesFromServices = async (): Promise<CustomARN[]> => {
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
  const apiGatewaysV2: ApiGatewayHttpApiARN[] = await listApiGatewaysV2();
  const sesIdentities: SESIdentityARN[] = await listSESIdentities();
  const snsTopics: SnsTopicARN[] = await listSnsTopics();
  const snsSubscriptions: SnsSubscriptionARN[] = await listSnsSubscriptions();
  const sesConfigurationSets: SESConfigurationSetARN[] =
    await listSESConfigurationSets();
  const restApiGateways: ApiGatewayRestApiARN[] = await listRestApiGateways();
  const dynamoDBTables: DynamoDBTableARN[] = await listDynamoDBTables();
  const iamRoles: IamRoleARN[] = await listIamRoles();

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
    ...iamRoles,
  ];
};
