import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';

import {
  ApiGatewayHttpApiARN,
  ApiGatewayRestApiARN,
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
} from '@sls-mentor/arn';

// This is a big switch
// eslint-disable-next-line complexity
const createARNFromCloudFormation = ({
  resourceType,
  physicalResourceId,
}: {
  resourceType: string;
  physicalResourceId: string;
}): CustomARN | undefined => {
  switch (resourceType) {
    case 'AWS::S3::Bucket':
      return S3BucketARN.fromPhysicalId(physicalResourceId);
    case 'AWS::Lambda::Function':
      return LambdaFunctionARN.fromPhysicalId(physicalResourceId);
    case 'AWS::SQS::Queue':
      return SqsQueueARN.fromPhysicalId(physicalResourceId);
    case 'AWS::Cognito::UserPool':
      return CognitoUserPoolARN.fromPhysicalId(physicalResourceId);
    case 'AWS::Logs::LogGroup':
      return CloudwatchLogGroupARN.fromPhysicalId(physicalResourceId);
    case 'AWS::Events::EventBus':
      return EventBridgeEventBusARN.fromPhysicalId(physicalResourceId);
    case 'AWS::RDS::DBInstance':
      return RdsInstanceARN.fromPhysicalId(physicalResourceId);
    case 'AWS::CloudFront::Distribution':
      return CloudFrontDistributionARN.fromPhysicalId(physicalResourceId);
    case 'AWS::ApiGatewayV2::Api':
      return ApiGatewayHttpApiARN.fromPhysicalId(physicalResourceId);
    case '"AWS::SES::EmailIdentity"':
      return SESIdentityARN.fromPhysicalId(physicalResourceId);
    case 'AWS::SNS::Subscription':
      return SnsSubscriptionARN.fromPhysicalId(physicalResourceId);
    case 'AWS::SNS::Topic':
      return SnsTopicARN.fromPhysicalId(physicalResourceId);
    case '"AWS::SES::ConfigurationSet"':
      return SESConfigurationSetARN.fromPhysicalId(physicalResourceId);
    case 'AWS::DynamoDB::Table':
      return DynamoDBTableARN.fromPhysicalId(physicalResourceId);
    case 'AWS::ApiGateway::RestApi':
      return ApiGatewayRestApiARN.fromPhysicalId(physicalResourceId);
    default:
      return;
  }
};

export const listAllResourcesFromCloudformation = async (
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
    .map(({ ResourceType, PhysicalResourceId }) => ({
      resourceType: ResourceType,
      physicalResourceId: PhysicalResourceId,
    }))
    .filter(
      (
        resource,
      ): resource is { resourceType: string; physicalResourceId: string } =>
        resource.resourceType !== undefined &&
        resource.physicalResourceId !== undefined,
    )
    .map(createARNFromCloudFormation)
    .filter((arn): arn is CustomARN => arn !== undefined);
};
