import { parse } from '@aws-sdk/util-arn-parser';

import { CustomARN } from 'CustomARN';
import { ArnService } from 'types';

export class SecretsManagerSecretARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.secretsmanager);
  }

  static fromSecretArn = (secretArn: string): SecretsManagerSecretARN => {
    const parsedArn = parse(secretArn);

    return new SecretsManagerSecretARN(parsedArn.resource);
  };

  static fromPhysicalId = (physicalId: string): SecretsManagerSecretARN =>
    this.fromSecretArn(physicalId);

  getSecretName = (): string => this.resource.split('-').slice(0, -1).join('-');

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.secretsmanager &&
    arn.resource.startsWith('secret:');

  static fromCustomARN = (arn: CustomARN): SecretsManagerSecretARN => {
    if (!SecretsManagerSecretARN.is(arn)) {
      throw new Error('Invalid SecretsManager Secret ARN');
    }

    return new SecretsManagerSecretARN(arn.resource);
  };
}
