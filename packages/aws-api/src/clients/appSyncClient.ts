import { AppSyncClient } from '@aws-sdk/client-appsync';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const appSyncClient = new AppSyncClient({});

(appSyncClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { appSyncClient };
