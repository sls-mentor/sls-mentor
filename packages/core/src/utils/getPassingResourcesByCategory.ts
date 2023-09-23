import { ChecksResults, PassingResourcesByCategory } from 'types';

import { getPassingResourcesFromRuleResults } from './getPassingResourcesFromRuleResults';

export const getPassingResourcesByCategory = (
  checksResults: ChecksResults,
): PassingResourcesByCategory =>
  checksResults.reduce((previous, current) => {
    const {
      passingResources,
      passingResourcesAmount,
      totalResources,
      totalResourcesAmount,
    } = getPassingResourcesFromRuleResults(current);

    const {
      rule: { categories },
    } = current;

    return {
      ...previous,
      ...Object.fromEntries(
        categories.map(category => [
          category,
          {
            passingResources: [
              ...(previous[category]?.passingResources ?? []),
              ...passingResources,
            ],
            totalResources: [
              ...(previous[category]?.totalResources ?? []),
              ...totalResources,
            ],
            passingResourcesAmount:
              (previous[category]?.passingResourcesAmount ?? 0) +
              passingResourcesAmount,
            totalResourcesAmount:
              (previous[category]?.totalResourcesAmount ?? 0) +
              totalResourcesAmount,
          },
        ]),
      ),
    };
  }, {} as PassingResourcesByCategory);
