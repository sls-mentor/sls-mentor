import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class DynamoDBTableARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.dynamodb);
  }

  static fromTableName = (tableName: string): DynamoDBTableARN =>
    new DynamoDBTableARN(`table/${tableName}`);

  static fromPhysicalId = (physicalId: string): DynamoDBTableARN =>
    DynamoDBTableARN.fromTableName(physicalId);

  getTableName = (): string => {
    const tableName = this.resource.split('/')[1];

    if (tableName === undefined) {
      throw new Error('Invalid DynamoDB Table ARN');
    }

    return tableName;
  };
}
