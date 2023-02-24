import { Rule } from '@sls-mentor/core';
import { RemovalPolicy, Tags } from 'aws-cdk-lib';
import {
  CfnLogGroup,
  LogGroup,
  LogGroupProps,
  RetentionDays,
} from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultLogGroup extends LogGroup implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<LogGroupProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<LogGroupProps, Partial<LogGroupProps>>(
        {
          retention: RetentionDays.ONE_MONTH,
          removalPolicy: RemovalPolicy.DESTROY,
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnLogGroup).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
