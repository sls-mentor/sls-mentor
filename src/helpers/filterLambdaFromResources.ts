import { ARN } from '@aws-sdk/util-arn-parser';

export const filterLambdaFromResources = (resources: ARN[]): ARN[] =>
  resources.filter(arn => arn.service === 'lambda');
