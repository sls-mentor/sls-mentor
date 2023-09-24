import { ChecksResults, PassingResourcesByLevel } from 'types';

import { getPassingResourcesFromRuleResults } from './getPassingResourcesFromRuleResults';

export const getPassingResourcesByLevel = (
  checksResults: ChecksResults,
): PassingResourcesByLevel =>
  checksResults.reduce((previous, current) => {
    const {
      passingResourcesAmount,
      totalResourcesAmount,
      passingResources,
      totalResources,
    } = getPassingResourcesFromRuleResults(current);

    const {
      rule: { level },
    } = current;

    return {
      ...previous,
      [level]: {
        passingResources: [
          ...(previous[level]?.passingResources ?? []),
          ...passingResources,
        ],
        totalResources: [
          ...(previous[level]?.totalResources ?? []),
          ...totalResources,
        ],
        passingResourcesAmount:
          (previous[level]?.passingResourcesAmount ?? 0) +
          passingResourcesAmount,
        totalResourcesAmount:
          (previous[level]?.totalResourcesAmount ?? 0) + totalResourcesAmount,
      },
    };
  }, {} as PassingResourcesByLevel);
