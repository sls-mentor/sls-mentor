import { Construct } from 'constructs';

import { cognitoEnforceLongPasswords } from '@sls-mentor/rules';

import { DefaultUserPool } from '../defaultConstructs';

interface EnforceLongPasswordsProps {
  minLength: number;
}

export class EnforceLongPasswords extends Construct {
  static passTestCases: Record<string, EnforceLongPasswordsProps> = {
    'Password min lenth 10': { minLength: 10 },
  };

  static failTestCases: Record<string, EnforceLongPasswordsProps> = {
    'Password min lenth 8': { minLength: 8 },
  };

  constructor(
    scope: Construct,
    id: string,
    { minLength }: EnforceLongPasswordsProps,
  ) {
    super(scope, id);
    const userPool = new DefaultUserPool(this, 'UserPool', {
      passwordPolicy: { minLength },
    });
    userPool.tagRule(cognitoEnforceLongPasswords);
  }
}
