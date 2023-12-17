import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const cognitoIdpClient = new CognitoIdentityProviderClient({});

(cognitoIdpClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { cognitoIdpClient };
