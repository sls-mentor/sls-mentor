import { ChecksResults, PassingRulesByLevel } from 'types';

export const getPassingRulesByLevel = (
  checksResults: ChecksResults,
): PassingRulesByLevel =>
  checksResults.reduce((previous, current) => {
    const {
      rule: { level, fileName },
      result,
    } = current;

    const ruleSuccess = result.every(({ success }) => success);

    return {
      ...previous,
      [level]: {
        passingRules: [
          ...(previous[level]?.passingRules ?? []),
          ...(ruleSuccess ? [fileName] : []),
        ],
        totalRules: [...(previous[level]?.passingRules ?? []), fileName],
        passingRulesAmount:
          (previous[level]?.passingRulesAmount ?? 0) + (ruleSuccess ? 1 : 0),
        totalRulesAmount: (previous[level]?.totalRulesAmount ?? 0) + 1,
      },
    };
  }, {} as PassingRulesByLevel);
