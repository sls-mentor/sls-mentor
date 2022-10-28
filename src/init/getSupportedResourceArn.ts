import { ARN } from '@aws-sdk/util-arn-parser';

const getS3ResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 's3',
    region,
    accountId,
    resource,
  };
};

const getLambdaResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'lambda',
    region,
    accountId,
    resource: `function:${resource}`,
  };
};

const getSQSResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'sqs',
    region,
    accountId,
    resource,
  };
};

const getLogGroupResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'logs',
    region,
    accountId,
    // transformation needed to format the arn the same way as tagging client does
    resource: 'log-group:' + resource,
  };
};

const getEventBridgeResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'events',
    region,
    accountId,
    resource: 'event-bus/' + resource,
  };
};

const getCognitoUserPoolResourceArn = (
  region: string,
  accountId: string,
  resource: string,
): ARN => {
  return {
    partition: 'aws',
    service: 'cognito-idp',
    region,
    accountId,
    resource: 'userpool/' + resource,
  };
};

export const ressourceTypeToRessources: {
  [string: string]: (
    region: string,
    accountId: string,
    resource: string,
  ) => ARN;
} = {
  'AWS::Lambda::Function': getLambdaResourceArn,
  'AWS::S3::Bucket': getS3ResourceArn,
  'AWS::SQS::Queue': getSQSResourceArn,
  'AWS::Logs::LogGroup': getLogGroupResourceArn,
  'AWS::Events::EventBus': getEventBridgeResourceArn,
  'AWS::Cognito::UserPool': getCognitoUserPoolResourceArn,
};

export const getSupportedResourceArn = (
  {
    ResourceType,
    PhysicalResourceId,
  }: {
    ResourceType: string;
    PhysicalResourceId: string;
  },
  region: string,
  account: string,
): ARN[] => {
  const resourceARN = [];
  const getRessources: (
    region: string,
    accountId: string,
    resource: string,
  ) => ARN = ressourceTypeToRessources[ResourceType];

  resourceARN.push(getRessources(region, account, PhysicalResourceId));

  return resourceARN;
};
