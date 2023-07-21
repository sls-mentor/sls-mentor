import { CustomARN } from '../CustomARN';

export class DynamoDBTableARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'dynamodb');
  }

  static fromTableName = (tableName: string): DynamoDBTableARN =>
    new DynamoDBTableARN(`table/${tableName}`);

  static fromPhysicalId = (physicalId: string): DynamoDBTableARN =>
    DynamoDBTableARN.fromTableName(physicalId);

  getTableName = (): string => this.resource.split('/')[1];
}
