import { Tags } from 'aws-cdk-lib';
import { Rule, RuleProps } from 'aws-cdk-lib/aws-events';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { Rule as SlsMentorRule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultEventBridgeRule extends Rule implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<RuleProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<RuleProps, Partial<RuleProps>>(
        {
          eventPattern: {
            source: ['unexistingSource'],
          },
        },
        props,
      ),
    );
  }

  tagRule(rule: SlsMentorRule): void {
    Tags.of(this.node.defaultChild as CfnBucket).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
