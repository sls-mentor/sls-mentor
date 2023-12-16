import { S3Client } from '@aws-sdk/client-s3';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const s3Client = new S3Client({});

(s3Client.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { s3Client };
