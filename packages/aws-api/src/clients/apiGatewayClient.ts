import { APIGatewayClient } from '@aws-sdk/client-api-gateway';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const apiGatewayClient = new APIGatewayClient({});

(apiGatewayClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { apiGatewayClient };
