import { SQSClient } from '@aws-sdk/client-sqs';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const sqsClient = new SQSClient({});

(sqsClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { sqsClient };
