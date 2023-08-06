import { Construct } from 'constructs';
import { DefaultDynamodb } from '../../../tests/constructs';
import { dynamodbBackupConfig } from './index';

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
    const dynamodbTable = new DefaultDynamodb(
      this,
      dynamodbTableId,
      backup ? 'backedUpTable' : 'notBackedUpTable',
      backup,
    );
    dynamodbTable.tagRule(dynamodbBackupConfig);
  }
}
