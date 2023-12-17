import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const eventBridgeClient = new EventBridgeClient({});

(eventBridgeClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { eventBridgeClient };
