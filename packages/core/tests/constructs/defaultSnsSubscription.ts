import { Tags } from 'aws-cdk-lib';
import {
  CfnSubscription,
  Subscription,
  SubscriptionProps,
  SubscriptionProtocol,
} from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { Rule } from '../../src/types';

import { DefaultSnsTopic } from './defaultSnsTopic';
import { DefaultSqsQueue } from './defaultSqsQueue';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultSnsSubscription extends Subscription implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<SubscriptionProps> | undefined = {},
  ) {
    const topic = new DefaultSnsTopic(scope, `${id}-topic`);

    super(
      scope,
      id,
      Object.assign<SubscriptionProps, Partial<SubscriptionProps>>(
        {
          topic,
          protocol: SubscriptionProtocol.EMAIL,
          endpoint: 'success@simulator.amazonses.com',
          deadLetterQueue: new DefaultSqsQueue(scope, `${id}-queue`),
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnSubscription).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
