import { GuardianARN } from '../GuardianARN';

export class CognitoUserPoolARN extends GuardianARN {
  constructor(resource: string) {
    super(resource, 'cognito-idp');
  }

  static fromUserPoolId = (userPoolId: string): CognitoUserPoolARN =>
    new CognitoUserPoolARN(`userpool/${userPoolId}`);

  static fromPhysicalId = (physicalId: string): CognitoUserPoolARN =>
    CognitoUserPoolARN.fromUserPoolId(physicalId);

  getUserPoolId = (): string => this.resource.split('/')[1];
}
