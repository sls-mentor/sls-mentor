import { PassingResourcesByRule } from 'types';

import { getPercentageFromPassingResources } from './getPercentageFromPassingResources';

export const getOverallPercentage = (
  passingResourcesByRule: PassingResourcesByRule,
): number => {
  const overallPassingResources = Object.values(passingResourcesByRule).reduce(
    (previous, current) => {
      return {
        passingResourcesAmount:
          previous.passingResourcesAmount + current.passingResourcesAmount,
        totalResourcesAmount:
          previous.totalResourcesAmount + current.totalResourcesAmount,
      };
    },
    { passingResourcesAmount: 0, totalResourcesAmount: 0 },
  );

  return getPercentageFromPassingResources(overallPassingResources);
};
