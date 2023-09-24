import { ChecksResults, PassingRulesByService } from 'types';

export const getPassingRulesByService = (
  checksResults: ChecksResults,
): PassingRulesByService =>
  checksResults.reduce((previous, current) => {
    const {
      rule: { service, fileName },
      result,
    } = current;

    const ruleSuccess = result.every(({ success }) => success);

    return {
      ...previous,
      [service]: {
        passingRules: [
          ...(previous[service]?.passingRules ?? []),
          ...(ruleSuccess ? [fileName] : []),
        ],
        totalRules: [...(previous[service]?.passingRules ?? []), fileName],
        passingRulesAmount:
          (previous[service]?.passingRulesAmount ?? 0) + (ruleSuccess ? 1 : 0),
        totalRulesAmount: (previous[service]?.totalRulesAmount ?? 0) + 1,
      },
    };
  }, {} as PassingRulesByService);
