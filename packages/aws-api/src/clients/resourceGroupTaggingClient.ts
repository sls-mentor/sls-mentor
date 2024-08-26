import { ResourceGroupsTaggingAPIClient } from '@aws-sdk/client-resource-groups-tagging-api';
import { MiddlewareStack } from '@aws-sdk/types';

import { cachePlugin } from './cachePlugin';

const resourceGroupsTaggingClient = new ResourceGroupsTaggingAPIClient({});

(
  resourceGroupsTaggingClient.middlewareStack as MiddlewareStack<object, object>
).use(cachePlugin());

export { resourceGroupsTaggingClient };
