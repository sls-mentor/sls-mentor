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
    return this.resource.split('/')[1];
  };
}
