import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const cloudWatchLogsClient = new CloudWatchLogsClient({});

(cloudWatchLogsClient.middlewareStack as MiddlewareStack<object, object>).use(
  cachePlugin(),
);

export { cloudWatchLogsClient };
