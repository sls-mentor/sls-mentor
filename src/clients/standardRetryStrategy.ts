import { StandardRetryStrategy } from '@aws-sdk/middleware-retry';

export const MAXIMUM_ATTEMPTS = 10;
const DELAY_RATIO = 1000;

export const standardRetryStrategy = new StandardRetryStrategy(
  () => Promise.resolve(MAXIMUM_ATTEMPTS),
  {
    delayDecider: (_delayBase, attempts) => {
      return DELAY_RATIO * attempts;
    },
  },
);

standardRetryStrategy.mode = 'STANDARD';
