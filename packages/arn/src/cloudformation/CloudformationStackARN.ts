import { parse } from '@aws-sdk/util-arn-parser';

import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class CloudformationStackARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.cloudformation);
  }

  static fromStackId = (stackId: string): CloudformationStackARN => {
    const parsedArn = parse(stackId);

    return new CloudformationStackARN(parsedArn.resource);
  };

  getStackName = (): string => {
    const stackName = this.resource.split('/')[1];

    if (stackName === undefined) {
      throw new Error('Invalid Cloudformation Stack ARN');
    }

    return stackName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.cloudformation &&
    arn.resource.startsWith('stack/');

  static fromCustomARN = (arn: CustomARN): CloudformationStackARN => {
    if (!CloudformationStackARN.is(arn)) {
      throw new Error('Invalid Cloudformation Stack ARN');
    }

    return new CloudformationStackARN(arn.resource);
  };
}
