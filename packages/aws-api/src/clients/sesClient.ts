import { SESv2Client } from '@aws-sdk/client-sesv2';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const sesClient = new SESv2Client({});

(sesClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { sesClient };
