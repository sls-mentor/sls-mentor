import { Tags } from 'aws-cdk-lib';
import {
  CfnSubscription,
  Subscription,
  SubscriptionProps,
  SubscriptionProtocol,
} from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';
import { DefaultFunction } from './defaultFunction';
import { DefaultSnsTopic } from './defaultSnsTopic';
import { DefaultSqsQueue } from './defaultSqsQueue';

export class DefaultSnsSubscription extends Subscription implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<SubscriptionProps> | undefined = {},
  ) {
    const topic = new DefaultSnsTopic(scope, `${id}-topic`);

    const { functionArn } = new DefaultFunction(scope, 'subscribedLambda');

    super(
      scope,
      id,
      Object.assign<SubscriptionProps, Partial<SubscriptionProps>>(
        {
          topic,
          protocol: SubscriptionProtocol.LAMBDA,
          endpoint: functionArn,
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
