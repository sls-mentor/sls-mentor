import { Tags } from 'aws-cdk-lib';
import {
  CfnEmailIdentity,
  EmailIdentity,
  EmailIdentityProps,
  Identity,
} from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';
import { Rule } from '../../src/types';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultIdentity extends EmailIdentity implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<EmailIdentityProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<EmailIdentityProps, Partial<EmailIdentityProps>>(
        {
          identity: Identity.domain('example.com'),
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnEmailIdentity).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
