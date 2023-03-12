import { rules, SlsMentorLevel } from '@sls-mentor/core';
import { Results } from '../types';

const isRuleName = (ruleName: string): boolean =>
  rules.find(({ fileName }) => fileName === ruleName) !== undefined;

export const parseParams = (
  queryString: string,
): { results: Results; level: SlsMentorLevel } | undefined => {
  try {
    const queryStrings = queryString
      .slice(1) // remove '?'
      .split('&');

    const results = Object.fromEntries(
      queryStrings
        .map(stringParam => {
          const [ruleName, result] = stringParam.split('=');

          const [passingResources, totalResources] = result
            .split('/')
            .map(Number);

          return [ruleName, { passingResources, totalResources }] as const;
        })
        .filter(([ruleName]) => isRuleName(ruleName)),
    );

    const level =
      queryStrings
        .map(stringParam => {
          const [key, value] = stringParam.split('=');

          return [key, value];
        })
        .find(([key]) => key === 'level')?.[1] ?? '1';

    return { results, level: +level as SlsMentorLevel };
  } catch {
    return undefined;
  }
};
