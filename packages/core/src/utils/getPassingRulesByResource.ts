import { RuleName } from '@sls-mentor/rules';

import { ChecksResults, PassingRules, PassingRulesByResource } from 'types';

export const getPassingRulesByResource = (
  checksResults: ChecksResults,
): PassingRulesByResource =>
  checksResults.reduce((previous, current) => {
    const {
      rule: { fileName },
      result,
    } = current;

    return {
      ...previous,
      ...Object.fromEntries(
        result.map(({ arn, success }): [string, PassingRules] => {
          const arnString = arn.toString();

          return [
            arnString,
            {
              passingRules: [
                ...(previous[arnString]?.passingRules ?? []),
                ...(success ? [fileName as RuleName] : []),
              ],
              totalRules: [
                ...(previous[arnString]?.totalRules ?? []),
                fileName as RuleName,
              ],
              passingRulesAmount:
                (previous[arnString]?.passingRulesAmount ?? 0) +
                (success ? 1 : 0),
              totalRulesAmount:
                (previous[arnString]?.totalRulesAmount ?? 0) + 1,
            },
          ];
        }),
      ),
    };
  }, {} as PassingRulesByResource);
