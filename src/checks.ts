import { MultiBar, Presets } from 'cli-progress';
import { rulesByLevel } from './constants/level';
import { ChecksResults, GuardianARN } from './types';

export const runChecks = async (
  allResourceArns: GuardianARN[],
  level: number,
): Promise<ChecksResults> => {
  const progressBar = new MultiBar(
    { emptyOnZero: true, hideCursor: true },
    Presets.rect,
  );
  process.on('SIGINT', () => {
    progressBar.stop();
    process.exit(0);
  });

  const rules = rulesByLevel.slice(0, level).flat();

  const total = rules.length + 1;

  const rulesProgressBar = progressBar.create(
    total,
    0,
    {},
    { format: 'Rules:  {bar} {percentage}% | ETA: {eta}s | {value}/{total}' },
  );

  const decreaseRemaining = () => {
    rulesProgressBar.increment();
  };

  decreaseRemaining();

  const results = await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(allResourceArns)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  return results;
};
