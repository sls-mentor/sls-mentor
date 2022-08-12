import {
  LambdaClient,
  ServiceInputTypes,
  ServiceOutputTypes,
} from '@aws-sdk/client-lambda';

import hash from 'object-hash';

import { InitializeHandlerOutput, Pluggable } from '@aws-sdk/types';
import {
  MAXIMUM_ATTEMPTS,
  standardRetryStrategy,
} from './standardRetryStrategy';

const cache: Record<
  string,
  Promise<InitializeHandlerOutput<ServiceOutputTypes>>
> = {};

const plugin: Pluggable<ServiceInputTypes, ServiceOutputTypes> = {
  applyToStack: stack => {
    stack.add(
      next => async args => {
        const inputHash = hash(args);
        if (inputHash in cache) {
          return cache[inputHash];
        }
        const result = next(args);
        Object.assign(cache, { [hash(args)]: result });

        return await result;
      },
      { step: 'initialize' },
    );
  },
};

const client = new LambdaClient({
  maxAttempts: MAXIMUM_ATTEMPTS,
  retryStrategy: standardRetryStrategy,
});
// @ts-ignore : Prevent error ts(2345) - No way to discriminate output type among all possible Lambda Service output types
client.middlewareStack.use(plugin);

export default client;
