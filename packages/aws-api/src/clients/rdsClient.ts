import { RDSClient } from '@aws-sdk/client-rds';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const rdsClient = new RDSClient({});

(rdsClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { rdsClient };
