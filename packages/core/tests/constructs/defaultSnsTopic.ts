import { Tags } from 'aws-cdk-lib';
import { CfnTopic, Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { Rule } from '../../src/types';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultSnsTopic extends Topic implements Tagger {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnTopic).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
