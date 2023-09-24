import { Tags } from 'aws-cdk-lib';
import {
  CfnConfigurationSet,
  ConfigurationSet,
  ConfigurationSetProps,
} from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultConfigurationSet
  extends ConfigurationSet
  implements Tagger
{
  constructor(
    scope: Construct,
    id: string,
    props: Partial<ConfigurationSetProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<ConfigurationSetProps, Partial<ConfigurationSetProps>>(
        { reputationMetrics: true },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnConfigurationSet).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
