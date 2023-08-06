import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // ES Modules import

const client = new DynamoDBClient({ region: 'eu-west-1' });

export default client;
