import {
  CloudFormationClient,
  paginateListStackResources,
  paginateListStacks,
  StackResourceSummary,
  StackStatus,
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
  IamRoleARN,
  LambdaFunctionARN,
  RdsInstanceARN,
  S3BucketARN,
  SESConfigurationSetARN,
  SESIdentityARN,
  SnsSubscriptionARN,
  SnsTopicARN,
  SqsQueueARN,
  StepFunctionStateMachineARN,
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
    case 'AWS::IAM::Role':
      return IamRoleARN.fromPhysicalId(physicalResourceId);
    case 'AWS::StepFunctions::StateMachine':
      return StepFunctionStateMachineARN.fromPhysicalId(physicalResourceId);
    default:
      return;
  }
};

const generateStackNameToRootStackName = async (
  cloudformationStacksToFilter: string[],
  cloudFormationClient: CloudFormationClient,
): Promise<Record<string, string>> => {
  if (cloudformationStacksToFilter.length > 0) {
    return Object.fromEntries(
      cloudformationStacksToFilter.map(stack => [stack, stack]),
    );
  }

  const cloudformationStacks: {
    stackId: string;
    stackName: string;
    rootStackId?: string;
  }[] = [];

  for await (const page of paginateListStacks(
    {
      client: cloudFormationClient,
    },
    {
      StackStatusFilter: Object.values(StackStatus).filter(
        status =>
          status !== StackStatus.DELETE_COMPLETE &&
          status !== StackStatus.DELETE_FAILED &&
          status !== StackStatus.DELETE_IN_PROGRESS,
      ),
    },
  )) {
    cloudformationStacks.push(
      ...(page.StackSummaries?.map(stack => ({
        stackId: stack.StackId ?? '',
        stackName: stack.StackName ?? '',
        rootStackId: stack.RootId,
      })) ?? []),
    );
  }

  const stackNameToRootStackName: Record<string, string> = {};

  for (const { rootStackId, stackName } of cloudformationStacks) {
    if (rootStackId === undefined) {
      stackNameToRootStackName[stackName] = stackName;
    } else {
      const rootStack = cloudformationStacks.find(
        otherStack => otherStack.stackId === rootStackId,
      );

      if (rootStack !== undefined) {
        stackNameToRootStackName[stackName] = rootStack.stackName;
      }
    }
  }

  return stackNameToRootStackName;
};

type ResourcesWithStackName = StackResourceSummary & { StackName: string };

export const listAllResourcesFromCloudformation = async (
  cloudformationStacksToFilter: string[],
): Promise<{ arn: CustomARN; cloudformationStack: string }[]> => {
  const cloudFormationClient = new CloudFormationClient({});

  const stackNameToRootStackName = await generateStackNameToRootStackName(
    cloudformationStacksToFilter,
    cloudFormationClient,
  );

  const cloudformationStacksToSearch = Object.keys(stackNameToRootStackName);

  const resources: ResourcesWithStackName[] = [];
  for (const stack of cloudformationStacksToSearch) {
    try {
      for await (const page of paginateListStackResources(
        { client: cloudFormationClient },
        { StackName: stack },
      )) {
        page.StackResourceSummaries?.forEach(resource =>
          resources.push({ ...resource, StackName: stack }),
        );
      }
    } catch (error) {
      console.error(`Error while listing resources for stack ${stack}`);
    }
  }

  return resources
    .map(({ ResourceType, PhysicalResourceId, StackName }) => ({
      resourceType: ResourceType,
      physicalResourceId: PhysicalResourceId,
      stackName: StackName,
    }))
    .filter(
      (
        resource,
      ): resource is {
        resourceType: string;
        physicalResourceId: string;
        stackName: string;
      } =>
        resource.resourceType !== undefined &&
        resource.physicalResourceId !== undefined,
    )
    .map(({ resourceType, physicalResourceId, stackName }) => ({
      arn: createARNFromCloudFormation({
        resourceType,
        physicalResourceId,
      }),
      cloudformationStack: stackNameToRootStackName[stackName],
    }))
    .filter(
      (resource): resource is { arn: CustomARN; cloudformationStack: string } =>
        resource.arn !== undefined,
    );
};
