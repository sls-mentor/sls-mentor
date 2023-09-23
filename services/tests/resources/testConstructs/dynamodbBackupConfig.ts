import { Construct } from 'constructs';

import { dynamodbBackupConfig } from '@sls-mentor/rules';

import { DefaultDynamoDBTable } from '../defaultConstructs';

interface DynamodbBackupConfigProps {
  backup: boolean;
}

export class DynamodbBackupConfig extends Construct {
  static passTestCases: Record<string, DynamodbBackupConfigProps> = {
    Backup: { backup: true },
  };

  static failTestCases: Record<string, DynamodbBackupConfigProps> = {
    'No backup': { backup: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { backup }: DynamodbBackupConfigProps,
  ) {
    super(scope, id);
    const dynamodbTableId = 'DynamodbTable';
    const dynamodbTable = new DefaultDynamoDBTable(
      this,
      dynamodbTableId,
      {},
      backup,
    );
    dynamodbTable.tagRule(dynamodbBackupConfig);
  }
}
