import {
  LambdaClient,
  ServiceInputTypes,
  ServiceOutputTypes,
} from '@aws-sdk/client-lambda';
import { InitializeHandlerOutput, Pluggable } from '@aws-sdk/types';
import hash from 'object-hash';
import throttledQueue from 'throttled-queue';

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
        const cachedResult = cache[inputHash];

        if (cachedResult) {
          return cachedResult;
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

const lambdaClient = new LambdaClient({});

lambdaClient.middlewareStack.use(cachePlugin);

export { lambdaClient };
