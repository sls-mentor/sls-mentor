import {
  LambdaClient,
  ServiceInputTypes,
  ServiceOutputTypes,
} from '@aws-sdk/client-lambda';

import hash from 'object-hash';
import throttledQueue from 'throttled-queue';

import { InitializeHandlerOutput, Pluggable } from '@aws-sdk/types';

const SDK_RATE = 10;
const ONE_SECOND = 1000;

const queue = throttledQueue(1, ONE_SECOND / SDK_RATE);

const cache: Record<
  string,
  Promise<InitializeHandlerOutput<ServiceOutputTypes>>
> = {};

const cachePlugin: Pluggable<ServiceInputTypes, ServiceOutputTypes> = {
  applyToStack: stack => {
    stack.add(
      next => async args => {
        const inputHash = hash(args);
        if (inputHash in cache) {
          return cache[inputHash];
        }
        const resultPromise = queue(() => next(args));
        Object.assign(cache, { [inputHash]: resultPromise });

        const resolvedResult = await resultPromise;

        return resolvedResult;
      },
      { step: 'initialize' },
    );
  },
};

const client = new LambdaClient({});

// @ts-ignore : Prevent error ts(2345) - No way to discriminate output type among all possible Lambda Service output types
client.middlewareStack.use(cachePlugin);

export default client;
