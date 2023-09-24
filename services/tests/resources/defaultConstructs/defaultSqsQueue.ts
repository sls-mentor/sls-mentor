import { Tags } from 'aws-cdk-lib';
import { CfnQueue, Queue, QueueProps } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultSqsQueue extends Queue implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<QueueProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<QueueProps, Partial<QueueProps>>(
        {
          deadLetterQueue: {
            maxReceiveCount: 1,
            queue: new Queue(scope, `${id}-dlq`),
          },
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnQueue).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
