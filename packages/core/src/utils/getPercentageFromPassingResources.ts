import { PassingResources } from 'types';

export const getPercentageFromPassingResources = (
  passingResources:
    | Pick<PassingResources, 'passingResourcesAmount' | 'totalResourcesAmount'>
    | undefined,
): number => {
  if (
    passingResources === undefined ||
    passingResources.totalResourcesAmount === 0
  ) {
    return 100;
  }

  return Math.floor(
    (passingResources.passingResourcesAmount /
      passingResources.totalResourcesAmount) *
      100,
  );
};
