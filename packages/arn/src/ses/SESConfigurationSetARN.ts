import { CustomARN } from '../CustomARN';

export class SESConfigurationSetARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'ses');
  }
  static fromConfigurationSetName = (
    configuration: string,
  ): SESConfigurationSetARN => {
    return new SESConfigurationSetARN(`configuration/${configuration}`);
  };
  getName = (): string => {
    const name = this.resource.split('/')[1];

    if (name === undefined) {
      throw new Error('Invalid SES Configuration Set ARN');
    }

    return name;
  };

  static fromPhysicalId = (physicalId: string): SESConfigurationSetARN =>
    SESConfigurationSetARN.fromConfigurationSetName(physicalId);
}
