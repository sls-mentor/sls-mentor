import { StandardRetryStrategy } from '@aws-sdk/middleware-retry';

export const MAXIMUM_ATTEMPTS = 10;
const DELAY_INCREMENT = 1000;

export const standardRetryStrategy = new StandardRetryStrategy(
  () => Promise.resolve(MAXIMUM_ATTEMPTS),
  {
    delayDecider: (_delayBase, attempts) => {
      return DELAY_INCREMENT * attempts;
    },
  },
);

standardRetryStrategy.mode = 'STANDARD';
