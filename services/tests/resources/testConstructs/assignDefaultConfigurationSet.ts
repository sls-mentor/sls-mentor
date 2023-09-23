import { Construct } from 'constructs';

import { assignDefaultConfigurationSet as assignDefaultConfigurationSetRule } from '@sls-mentor/rules';

import { DefaultIdentity } from '../defaultConstructs';

type AssignDefaultConfigurationSetProps = {
  hasAssignedConfigurationSet: boolean;
};

export class AssignDefaultConfigurationSet extends Construct {
  static passTestCases: Record<string, AssignDefaultConfigurationSetProps> = {
    'Identity with a configuration set assigned': {
      hasAssignedConfigurationSet: true,
    },
  };
  static failTestCases: Record<string, AssignDefaultConfigurationSetProps> = {
    'Identity with no configuration set assigned': {
      hasAssignedConfigurationSet: false,
    },
  };

  constructor(
    scope: Construct,
    id: string,
    { hasAssignedConfigurationSet }: AssignDefaultConfigurationSetProps,
  ) {
    super(scope, id);
    const nameDomain = hasAssignedConfigurationSet ? 'ok.com' : 'ko.com';
    const identity = new DefaultIdentity(
      this,
      'Identity' + nameDomain,
      hasAssignedConfigurationSet ? {} : { configurationSet: undefined },
      nameDomain,
    );
    identity.tagRule(assignDefaultConfigurationSetRule);
  }
}
