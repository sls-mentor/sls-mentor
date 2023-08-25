import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import {
  ApiGatewayV2ApiARN,
  CloudFrontDistributionARN,
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  CustomARN,
  DynamoDBTableARN,
  EventBridgeEventBusARN,
  LambdaFunctionARN,
  RdsInstanceARN,
  S3BucketARN,
  SESConfigurationSetARN,
  SESIdentityARN,
  SnsSubscriptionARN,
  SnsTopicARN,
  SqsQueueARN,
} from '@sls-mentor/core';

// This is a big switch
// eslint-disable-next-line complexity
export const createARNFromCloudFormation = ({
  ResourceType,
  PhysicalResourceId,
}: StackResourceSummary): CustomARN | undefined => {
  if (PhysicalResourceId === undefined || ResourceType === undefined) {
    return undefined;
  }
  switch (ResourceType) {
    case 'AWS::S3::Bucket':
      return S3BucketARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::Lambda::Function':
      return LambdaFunctionARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::SQS::Queue':
      return SqsQueueARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::Cognito::UserPool':
      return CognitoUserPoolARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::Logs::LogGroup':
      return CloudwatchLogGroupARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::Events::EventBus':
      return EventBridgeEventBusARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::RDS::DBInstance':
      return RdsInstanceARN.fromRdsInstanceName(PhysicalResourceId);
    case 'AWS::CloudFront::Distribution':
      return CloudFrontDistributionARN.fromPhysicalId(PhysicalResourceId);
    case 'AWS::ApiGatewayV2::Api':
      return ApiGatewayV2ApiARN.fromPhysicalId(PhysicalResourceId);
    case '"AWS::SES::EmailIdentity"':
      return SESIdentityARN.fromIdentityName(PhysicalResourceId);
    case 'AWS::SNS::Subscription':
      return SnsSubscriptionARN.fromArnString(PhysicalResourceId);
    case 'AWS::SNS::Topic':
      return SnsTopicARN.fromArnString(PhysicalResourceId);
    case '"AWS::SES::ConfigurationSet"':
      return SESConfigurationSetARN.fromConfigurationSetName(
        PhysicalResourceId,
      );
    case 'AWS::DynamoDB::Table':
      return DynamoDBTableARN.fromPhysicalId(PhysicalResourceId);
    default:
      return;
  }
};

export const fetchCloudFormationResourceArns = async (
  cloudformationStacks: string[],
): Promise<CustomARN[]> => {
  const cloudFormationClient = new CloudFormationClient({});

  const resources: StackResourceSummary[] = [];
  for (const stack of cloudformationStacks) {
    for await (const page of paginateListStackResources(
      { client: cloudFormationClient },
      { StackName: stack },
    )) {
      resources.push(...(page.StackResourceSummaries ?? []));
    }
  }

  return resources
    .map(createARNFromCloudFormation)
    .filter((arn): arn is CustomARN => arn !== undefined);
};
