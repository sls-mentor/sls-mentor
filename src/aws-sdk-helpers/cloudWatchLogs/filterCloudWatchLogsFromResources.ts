import { ARN } from '@aws-sdk/util-arn-parser';

export const filterCloudWatchLogsFromResources = (resources: ARN[]): ARN[] =>
  resources.filter(arn => arn.service === 'logs');
