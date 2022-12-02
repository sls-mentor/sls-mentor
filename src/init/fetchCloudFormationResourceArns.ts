import {
  CloudFormationClient,
  paginateListStackResources,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import {
  CloudwatchLogGroupARN,
  CognitoUserPoolARN,
  EventBridgeEventBusARN,
  GuardianARN,
  LambdaFunctionARN,
  S3BucketARN,
  SqsQueueARN,
} from '../types';

// This is a big switch
// eslint-disable-next-line complexity
export const createARNFromCloudFormation = ({
  ResourceType,
  PhysicalResourceId,
}: StackResourceSummary): GuardianARN | undefined => {
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
    default:
      return;
  }
};

export const fetchCloudFormationResourceArns = async (
  cloudformationStacks: string[],
): Promise<GuardianARN[]> => {
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
    .filter((arn): arn is GuardianARN => arn !== undefined);
};
