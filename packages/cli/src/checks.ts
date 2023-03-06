import { CustomARN, RuleConfiguration, rules } from '@sls-mentor/core';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import { LILA_HEX } from './constants';
import { ChecksResults } from './types';

const formatSpinnerString = (current: number, total: number): string =>
  chalk.hex(LILA_HEX)(`%s Processing rules ${current}/${total}...`);

export const runChecks = async (
  allResourceArns: CustomARN[],
  level: number,
  rulesConfigurations?: Record<string, RuleConfiguration>,
): Promise<ChecksResults> => {
  const rulesToRunAccordingToLevel = rules.filter(rule => rule.level <= level);

  const total = rulesToRunAccordingToLevel.length;
  let current = 1;

  const rulesSpinner = new Spinner({
    text: formatSpinnerString(current, total),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  rulesSpinner.setSpinnerString('⠇⠋⠙⠸⠴⠦');

  rulesSpinner.start();

  const decreaseRemaining = () => {
    if (current < total) {
      current++;
      rulesSpinner.setSpinnerTitle(formatSpinnerString(current, total));
    }
  };

  decreaseRemaining();

  const results = await Promise.all(
    rulesToRunAccordingToLevel.map(async rule => {
      const ignoredArnPatterns =
        rulesConfigurations?.[rule.fileName]?.ignoredResources;

      const filteredResourcesArns = ignoredArnPatterns
        ? CustomARN.filterIgnoredArns(allResourceArns, ignoredArnPatterns)
        : allResourceArns;

      const ruleResult = (
        await rule.run(
          filteredResourcesArns,
          rulesConfigurations?.[rule.fileName],
        )
      ).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  rulesSpinner.stop(true);

  return results;
};
