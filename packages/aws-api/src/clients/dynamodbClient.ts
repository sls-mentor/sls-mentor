import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const dynamoDbClient = new DynamoDBClient({});

(dynamoDbClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { dynamoDbClient };
