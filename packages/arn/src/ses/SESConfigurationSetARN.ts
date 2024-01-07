import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class SESConfigurationSetARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.ses);
  }

  static fromConfigurationSetName = (
    configuration: string,
  ): SESConfigurationSetARN => {
    return new SESConfigurationSetARN(`configuration/${configuration}`);
  };

  static fromPhysicalId = (physicalId: string): SESConfigurationSetARN =>
    SESConfigurationSetARN.fromConfigurationSetName(physicalId);

  getConfigurationSetName = (): string => {
    const name = this.resource.split('/')[1];

    if (name === undefined) {
      throw new Error('Invalid SES Configuration Set ARN');
    }

    return name;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.ses && arn.resource.startsWith('configuration/');

  static fromCustomARN = (arn: CustomARN): SESConfigurationSetARN => {
    if (!SESConfigurationSetARN.is(arn)) {
      throw new Error('Invalid SES Configuration Set ARN');
    }

    return new SESConfigurationSetARN(arn.resource);
  };
}
