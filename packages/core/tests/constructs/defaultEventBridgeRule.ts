import { Tags } from 'aws-cdk-lib';
import { Rule, RuleProps } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Rule as SlsMentorRule } from '../../src/types';
import { DefaultFunction } from './defaultFunction';
import { DefaultSqsQueue } from './defaultSqsQueue';
import { RULE_TAG_KEY, Tagger } from './tags';

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
          targets: [
            new LambdaFunction(
              new DefaultFunction(scope, `${id}-target`, {
                deadLetterQueue: new DefaultSqsQueue(scope, `${id}-queue`),
              }),
            ),
          ],
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
