import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const cloudFrontClient = new CloudFrontClient({});

(cloudFrontClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { cloudFrontClient };
