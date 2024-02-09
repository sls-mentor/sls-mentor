import { SFNClient } from '@aws-sdk/client-sfn';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const stepFunctionClient = new SFNClient({});

(stepFunctionClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { stepFunctionClient };
