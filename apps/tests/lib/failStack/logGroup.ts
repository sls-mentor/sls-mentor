import * as cdk from 'aws-cdk-lib';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

export const FAIL_RETENTION_LOG_GROUP = 'failRetentionLogGroup';

export const setupLogGroup = (stack: cdk.Stack): void => {
  new LogGroup(stack, FAIL_RETENTION_LOG_GROUP, {
    retention: RetentionDays.INFINITE,
  });
};
