import { Tags } from 'aws-cdk-lib';
import {
  CfnSubscription,
  Subscription,
  SubscriptionProps,
  SubscriptionProtocol,
} from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { Rule } from '../../src/types';
import { DefaultFunction } from './defaultFunction';
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
    const targetLambda = new DefaultFunction(
      scope,
      `${id}-subscription-target`,
    );
    super(
      scope,
      id,
      Object.assign<SubscriptionProps, Partial<SubscriptionProps>>(
        {
          topic,
          protocol: SubscriptionProtocol.LAMBDA,
          endpoint: targetLambda.functionArn,
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
