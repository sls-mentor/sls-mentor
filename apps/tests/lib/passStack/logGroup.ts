import * as cdk from 'aws-cdk-lib';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

export const PASS_RETENTION_LOG_GROUP = 'passRetentionLogGroup';

export const setupLogGroup = (stack: cdk.Stack): void => {
  new LogGroup(stack, PASS_RETENTION_LOG_GROUP, {
    retention: RetentionDays.ONE_DAY,
  });
};
