import { ChecksResults, PassingRulesByCategory } from 'types';

export const getPassingRulesByCategory = (
  checksResults: ChecksResults,
): PassingRulesByCategory =>
  checksResults.reduce((previous, current) => {
    const {
      rule: { categories, fileName },
      result,
    } = current;

    const ruleSuccess = result.every(({ success }) => success);

    return {
      ...previous,
      ...Object.fromEntries(
        categories.map(category => [
          category,
          {
            passingRules: [
              ...(previous[category]?.passingRules ?? []),
              ...(ruleSuccess ? [fileName] : []),
            ],
            totalRules: [...(previous[category]?.passingRules ?? []), fileName],
            passingRulesAmount:
              (previous[category]?.passingRulesAmount ?? 0) +
              (ruleSuccess ? 1 : 0),
            totalRulesAmount: (previous[category]?.totalRulesAmount ?? 0) + 1,
          },
        ]),
      ),
    };
  }, {} as PassingRulesByCategory);
