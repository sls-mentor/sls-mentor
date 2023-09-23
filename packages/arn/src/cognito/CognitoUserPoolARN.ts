import { CustomARN } from '../CustomARN';

export class CognitoUserPoolARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'cognito-idp');
  }

  static fromUserPoolId = (userPoolId: string): CognitoUserPoolARN =>
    new CognitoUserPoolARN(`userpool/${userPoolId}`);

  static fromPhysicalId = (physicalId: string): CognitoUserPoolARN =>
    CognitoUserPoolARN.fromUserPoolId(physicalId);

  getUserPoolId = (): string => {
    const userPoolId = this.resource.split('/')[1];

    if (userPoolId === undefined) {
      throw new Error('Invalid Cognito User Pool ARN');
    }

    return userPoolId;
  };
}
