import { EC2Client } from '@aws-sdk/client-ec2';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const ec2Client = new EC2Client({});

(ec2Client.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { ec2Client };
