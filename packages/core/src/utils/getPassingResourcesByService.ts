import { ChecksResults, PassingResourcesByService } from 'types';

import { getPassingResourcesFromRuleResults } from './getPassingResourcesFromRuleResults';

export const getPassingResourcesByService = (
  checksResults: ChecksResults,
): PassingResourcesByService =>
  checksResults.reduce((previous, current) => {
    const {
      totalResources,
      totalResourcesAmount,
      passingResources,
      passingResourcesAmount,
    } = getPassingResourcesFromRuleResults(current);

    const {
      rule: { service },
    } = current;

    return {
      ...previous,
      [service]: {
        passingResources: [
          ...(previous[service]?.passingResources ?? []),
          ...passingResources,
        ],
        totalResources: [
          ...(previous[service]?.totalResources ?? []),
          ...totalResources,
        ],
        passingResourcesAmount:
          (previous[service]?.passingResourcesAmount ?? 0) +
          passingResourcesAmount,
        totalResourcesAmount:
          (previous[service]?.totalResourcesAmount ?? 0) + totalResourcesAmount,
      },
    };
  }, {} as PassingResourcesByService);
