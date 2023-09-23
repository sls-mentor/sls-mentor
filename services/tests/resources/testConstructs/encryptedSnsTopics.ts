import { Construct } from 'constructs';

import { encryptedSnsTopics as EncryptedSnsTopicsRule } from '@sls-mentor/rules';

import { DefaultSnsTopic } from '../defaultConstructs';

interface EncryptedSnsTopicsProps {
  isSnsTopicEncrypted: boolean;
}

export class EncryptedSnsTopics extends Construct {
  static passTestCases: Record<string, EncryptedSnsTopicsProps> = {
    'Encrypted SNS topic': { isSnsTopicEncrypted: true },
  };

  static failTestCases: Record<string, EncryptedSnsTopicsProps> = {
    'Not encrypted SNS topic': { isSnsTopicEncrypted: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { isSnsTopicEncrypted }: EncryptedSnsTopicsProps,
  ) {
    super(scope, id);
    const snsTopic = new DefaultSnsTopic(
      this,
      'EncryptedSnsTopics',
      isSnsTopicEncrypted ? {} : { masterKey: undefined },
    );
    snsTopic.tagRule(EncryptedSnsTopicsRule);
  }
}
