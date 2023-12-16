import { ApiGatewayV2Client } from '@aws-sdk/client-apigatewayv2';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const apiGatewayV2Client = new ApiGatewayV2Client({});

(apiGatewayV2Client.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { apiGatewayV2Client };
