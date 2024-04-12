export const ArnService = {
  lambda: 'lambda',
  sqs: 'sqs',
  sns: 'sns',
  dynamodb: 'dynamodb',
  s3: 's3',
  events: 'events',
  apigateway: 'apigateway',
  cloudfront: 'cloudfront',
  cognitoIdp: 'cognito-idp',
  rds: 'rds',
  ses: 'ses',
  iam: 'iam',
  logs: 'logs',
  backup: 'backup',
  states: 'states',
  appsync: 'appsync',
  secretsmanager: 'secretsmanager',
  cloudformation: 'cloudformation',
} as const;

export type ArnService = (typeof ArnService)[keyof typeof ArnService];

export const isArnService = (value: string): value is ArnService =>
  Object.values(ArnService).includes(value as ArnService);

export const ArnRegion = {
  UsEast1: 'us-east-1',
  UsEast2: 'us-east-2',
  UsWest1: 'us-west-1',
  UsWest2: 'us-west-2',

  EuWest1: 'eu-west-1',
  EuWest2: 'eu-west-2',
  EuWest3: 'eu-west-3',
  EuSouth1: 'eu-south-1',
  EuSouth2: 'eu-south-2',
  EuNorth1: 'eu-north-1',
  EuCentral1: 'eu-central-1',
  EuCentral2: 'eu-central-2',

  ApEast1: 'ap-east-1',
  ApSoutheast1: 'ap-southeast-1',
  ApSoutheast2: 'ap-southeast-2',
  ApSoutheast3: 'ap-southeast-3',
  ApSoutheast4: 'ap-southeast-4',
  ApSouth1: 'ap-south-1',
  ApSouth2: 'ap-south-2',
  ApNortheast1: 'ap-northeast-1',
  ApNortheast2: 'ap-northeast-2',
  ApNortheast3: 'ap-northeast-3',

  CaCentral1: 'ca-central-1',
  CaWest1: 'ca-west-1',

  IlCentral1: 'il-central-1',

  MeSouth1: 'me-south-1',
  MeCentral1: 'me-central-1',

  SaEast1: 'sa-east-1',

  AfSouth1: 'af-south-1',
} as const;

export type ArnRegion = (typeof ArnRegion)[keyof typeof ArnRegion];

export const isArnRegion = (value: string): value is ArnRegion =>
  Object.values(ArnRegion).includes(value as ArnRegion);

export const ArnPartition = {
  aws: 'aws',
  awsCn: 'aws-cn',
  awsUsGov: 'aws-us-gov',
} as const;
export type ArnPartition = (typeof ArnPartition)[keyof typeof ArnPartition];

export const isArnPartition = (value: string): value is ArnPartition =>
  Object.values(ArnPartition).includes(value as ArnPartition);

export const isValidAccountId = (value: string): boolean =>
  /^\d{12}$/.test(value);
