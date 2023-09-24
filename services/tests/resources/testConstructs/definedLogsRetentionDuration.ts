import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

import { definedLogsRetentionDuration as DefinedLogsRetentionDurationRule } from '@sls-mentor/rules';

import { DefaultLogGroup } from '../defaultConstructs';
interface DefinedLogsRetentionDurationProps {
  logRetention: RetentionDays;
}

export class DefinedLogsRetentionDuration extends Construct {
  static passTestCases: Record<string, DefinedLogsRetentionDurationProps> = {
    'One month retention': { logRetention: RetentionDays.ONE_MONTH },
  };

  static failTestCases: Record<string, DefinedLogsRetentionDurationProps> = {
    'Infinite retention': { logRetention: RetentionDays.INFINITE },
  };

  constructor(
    scope: Construct,
    id: string,
    { logRetention }: DefinedLogsRetentionDurationProps,
  ) {
    super(scope, id);
    const cloudwatchLogGroup = new DefaultLogGroup(this, 'CloudwatchLogGroup', {
      retention: logRetention,
    });
    cloudwatchLogGroup.tagRule(DefinedLogsRetentionDurationRule);
  }
}
