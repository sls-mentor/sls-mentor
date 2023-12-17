import {
  InitializeHandlerOutput,
  MiddlewareStack,
  Pluggable,
} from '@aws-sdk/types';
import hash from 'object-hash';
import throttledQueue from 'throttled-queue';

const SDK_RATE = 10;
const ONE_SECOND = 1000;

export const cachePlugin = ({
  maxRequestsPerInterval = 1,
  intervalsPerSecond = SDK_RATE,
}: {
  maxRequestsPerInterval?: number;
  intervalsPerSecond?: number;
} = {}): Pluggable<object, object> => {
  const cache: Record<string, Promise<InitializeHandlerOutput<object>>> = {};
  const queue = throttledQueue(
    maxRequestsPerInterval,
    ONE_SECOND / intervalsPerSecond,
  );

  return {
    applyToStack: (stack: MiddlewareStack<object, object>) => {
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
};
