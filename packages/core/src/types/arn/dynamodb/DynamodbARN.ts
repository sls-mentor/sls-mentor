import { CustomARN } from '../CustomARN';

export class DynamoDBARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'dynamodb');
  }

  static fromDynamoDBName = (dynamoDBName: string): DynamoDBARN =>
    new DynamoDBARN(`dynamodb:${dynamoDBName}`);

  static fromPhysicalId = (physicalId: string): DynamoDBARN =>
    DynamoDBARN.fromDynamoDBName(physicalId);
}
