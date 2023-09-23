import { Construct } from 'constructs';

import { enableDeletionProtectionOnDynamoDBTables as EnableDeletionProtectionOnDynamoDBTablesRule } from '@sls-mentor/rules';

import { DefaultDynamoDBTable } from '../defaultConstructs';

interface EnableDeletionProtectionOnDynamoDBTablesProps {
  DeletionProtectionEnabled: boolean;
}

export class EnableDeletionProtectionOnDynamoDBTables extends Construct {
  static passTestCases: Record<
    string,
    EnableDeletionProtectionOnDynamoDBTablesProps
  > = {
    'Deletion protection enabled on DynamoDB Table': {
      DeletionProtectionEnabled: true,
    },
  };

  static failTestCases: Record<
    string,
    EnableDeletionProtectionOnDynamoDBTablesProps
  > = {
    'Deletion protection not enabled on DynamoDB Table': {
      DeletionProtectionEnabled: false,
    },
  };

  constructor(
    scope: Construct,
    id: string,
    {
      DeletionProtectionEnabled,
    }: EnableDeletionProtectionOnDynamoDBTablesProps,
  ) {
    super(scope, id);
    const table = new DefaultDynamoDBTable(this, 'DynamoDBTable', {
      deletionProtection: DeletionProtectionEnabled,
    });
    table.tagRule(EnableDeletionProtectionOnDynamoDBTablesRule);
  }
}
