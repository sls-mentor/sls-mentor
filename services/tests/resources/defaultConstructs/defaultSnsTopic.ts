import { Tags } from 'aws-cdk-lib';
import { CfnTopic, Topic, TopicProps } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultSnsTopic extends Topic implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<TopicProps> | undefined = {},
  ) {
    super(scope, id, Object.assign<TopicProps, Partial<TopicProps>>({}, props));
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnTopic).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
