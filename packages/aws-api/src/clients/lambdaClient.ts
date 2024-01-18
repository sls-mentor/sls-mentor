import { LambdaClient } from '@aws-sdk/client-lambda';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const lambdaClient = new LambdaClient({});

(lambdaClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin({ maxRequestsPerInterval: 8 }),
);

export { lambdaClient };
