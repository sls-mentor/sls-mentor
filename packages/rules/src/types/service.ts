export const SERVICES = [
  'Lambda',
  'S3',
  'CloudWatch',
  'CloudFront',
  'Cognito',
  'DynamoDB',
  'SNS',
  'SQS',
  'EventBridge',
  'RDS',
  'Backup',
  'ApiGateway',
  'SES',
  'IAM',
] as const;
export type Service = (typeof SERVICES)[number];
