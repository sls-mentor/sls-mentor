import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class CognitoUserPoolARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.cognitoIdp);
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

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.cognitoIdp &&
    arn.resource.startsWith('userpool/');

  static fromCustomARN = (arn: CustomARN): CognitoUserPoolARN => {
    if (!CognitoUserPoolARN.is(arn)) {
      throw new Error('Invalid Cognito User Pool ARN');
    }

    return new CognitoUserPoolARN(arn.resource);
  };
}
