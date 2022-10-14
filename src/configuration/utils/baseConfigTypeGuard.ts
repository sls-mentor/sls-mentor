import { BaseConfiguration } from '../../types';

export const baseConfigTypeGuard = (
  config: unknown,
): config is BaseConfiguration => {
  if (!Object.prototype.hasOwnProperty.call(config, 'ignoredResources')) {
    return false;
  }

  const ignoredResources = (config as Record<string, unknown>).ignoredResources;
  if (!Array.isArray(ignoredResources)) {
    return false;
  }

  const isArrayOfString = ignoredResources.reduce<boolean>(
    (areValuesAllString, value) => {
      if (typeof value !== 'string') {
        return false;
      }

      return areValuesAllString;
    },
    true,
  );

  return isArrayOfString;
};
