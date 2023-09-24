import { ChecksResults, PassingResourcesByRule } from 'types';

import { getPassingResourcesFromRuleResults } from './getPassingResourcesFromRuleResults';

export const getPassingResourcesByRule = (
  checksResults: ChecksResults,
): PassingResourcesByRule =>
  Object.fromEntries(
    checksResults.map(ruleResults => {
      const {
        totalResources,
        totalResourcesAmount,
        passingResources,
        passingResourcesAmount,
      } = getPassingResourcesFromRuleResults(ruleResults);

      const {
        rule: { fileName },
      } = ruleResults;

      return [
        fileName,
        {
          totalResources,
          totalResourcesAmount,
          passingResources,
          passingResourcesAmount,
        },
      ];
    }),
  );
