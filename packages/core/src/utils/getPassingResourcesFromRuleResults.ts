import { RuleName } from '@sls-mentor/rules';

import { ChecksResults, PassingResources } from 'types';

export const getPassingResourcesFromRuleResults = (
  checksResults: ChecksResults[number],
): PassingResources => {
  const passingResources = checksResults.result
    .filter(({ success }) => success)
    .map(({ arn }) => ({
      arn: arn.toString(),
      ruleName: checksResults.rule.fileName as RuleName,
    }));
  const totalResources = checksResults.result.map(({ arn }) => ({
    arn: arn.toString(),
    ruleName: checksResults.rule.fileName as RuleName,
  }));

  return {
    passingResources,
    totalResources,
    passingResourcesAmount: passingResources.length,
    totalResourcesAmount: totalResources.length,
  };
};
