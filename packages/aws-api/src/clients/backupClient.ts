import { BackupClient } from '@aws-sdk/client-backup';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const backupClient = new BackupClient({});

(backupClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { backupClient };
