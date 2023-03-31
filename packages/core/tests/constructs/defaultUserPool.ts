import { Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnUserPool, UserPool, UserPoolProps } from 'aws-cdk-lib/aws-cognito';
import { Rule } from '../../src/types';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultUserPool extends UserPool implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<UserPoolProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<UserPoolProps, Partial<UserPoolProps>>(
        {
          passwordPolicy: { minLength: 10 },
          signInCaseSensitive: false,
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnUserPool).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
