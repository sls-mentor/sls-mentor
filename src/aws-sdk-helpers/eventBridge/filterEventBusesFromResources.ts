import { ARN } from '@aws-sdk/util-arn-parser';

export const filterEventBusesFromResources = (resourceArns: ARN[]): ARN[] =>
  resourceArns.filter(({ resource }) => resource.startsWith('event-bus/'));
