import { IAMClient } from '@aws-sdk/client-iam';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const iamClient = new IAMClient({});

(iamClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { iamClient };
