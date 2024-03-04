import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const secretsManagerClient = new SecretsManagerClient({});

(secretsManagerClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { secretsManagerClient };
