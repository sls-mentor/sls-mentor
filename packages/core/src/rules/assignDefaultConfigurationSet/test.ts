import { ConfigurationSet } from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';
import { DefaultIdentity } from '../../../tests/constructs';
import { assignDefaultConfigurationSet as assignDefaultConfigurationSetRule } from './index';

type AssignDefaultConfigurationSetProps = {
  assignConfigurationSet: ConfigurationSet | undefined;
};

export class AssignDefaultConfigurationSet extends Construct {
  createConfigurationSet = (scope: Construct): ConfigurationSet =>
    new ConfigurationSet(scope, 'ConfigurationSet', {});

  static passTestCases: Record<string, AssignDefaultConfigurationSetProps> = {
    Assigned: {
      assignConfigurationSet: undefined,
    },
  };
  static failTestCases: Record<string, AssignDefaultConfigurationSetProps> = {
    'Not assigned': {
      assignConfigurationSet: undefined,
    },
  };

  constructor(
    scope: Construct,
    id: string,
    { assignConfigurationSet }: AssignDefaultConfigurationSetProps,
  ) {
    super(scope, id);
    const identity = new DefaultIdentity(this, 'Identity', {
      configurationSet: assignConfigurationSet,
    });
    identity.tagRule(assignDefaultConfigurationSetRule);
  }
}
