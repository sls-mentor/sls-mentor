import { Construct } from 'constructs';
import { cognitoSignInCaseInsensitivity } from './index';
import { DefaultUserPool } from '../../../tests/constructs';

interface SignInCaseInsensitivityProps {
  signInCaseSensitive: boolean;
}

export class SignInCaseInsensitivity extends Construct {
  static passTestCases: Record<string, SignInCaseInsensitivityProps> = {
    'Sign in case sensitive': { signInCaseSensitive: false },
  };

  static failTestCases: Record<string, SignInCaseInsensitivityProps> = {
    'Sign in case insensitive': { signInCaseSensitive: true },
  };

  constructor(
    scope: Construct,
    id: string,
    { signInCaseSensitive }: SignInCaseInsensitivityProps,
  ) {
    super(scope, id);
    const userPool = new DefaultUserPool(this, 'UserPool', {
      signInCaseSensitive,
    });
    userPool.tagRule(cognitoSignInCaseInsensitivity);
  }
}
