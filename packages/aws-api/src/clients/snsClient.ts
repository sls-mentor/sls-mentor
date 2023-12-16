import { SNSClient } from '@aws-sdk/client-sns';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const snsClient = new SNSClient({});

(snsClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { snsClient };
