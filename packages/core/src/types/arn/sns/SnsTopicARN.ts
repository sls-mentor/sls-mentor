import { parse } from '@aws-sdk/util-arn-parser';
import { CustomARN } from '../CustomARN';

export class SnsTopicARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'sns');
  }

  static fromName = (name: string): SnsTopicARN => new SnsTopicARN(name);
  static fromArnString = (arnString: string): SnsTopicARN => {
    const parsedArn = parse(arnString);

    return new SnsTopicARN(parsedArn.resource);
  };
}
