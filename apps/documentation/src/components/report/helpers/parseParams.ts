import {
  ANONYMIZED_ACCOUNT_ID_PATH_PARAMETER,
  LEVEL_PATH_PARAMETER,
  rules,
  SlsMentorLevel,
} from '@sls-mentor/core';
import { Results } from '../types';

const isRuleName = (ruleName: string): boolean =>
  rules.find(({ fileName }) => fileName === ruleName) !== undefined;

export const parseParams = (
  queryString: string,
):
  | { results: Results; level: SlsMentorLevel; anonymizedAccountId: string }
  | undefined => {
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

    const level = queryStrings
      .map(stringParam => {
        const [key, value] = stringParam.split('=');

        return [key, value];
      })
      .find(([key]) => key === LEVEL_PATH_PARAMETER)?.[1];

    const anonymizedAccountId = queryStrings
      .map(stringParam => {
        const [key, value] = stringParam.split('=');

        return [key, value];
      })
      .find(([key]) => key === ANONYMIZED_ACCOUNT_ID_PATH_PARAMETER)?.[1];

    if (anonymizedAccountId === undefined || level === undefined) {
      throw new Error('Unexpected undefined anonymized account id or level');
    }

    return { results, level: +level as SlsMentorLevel, anonymizedAccountId };
  } catch {
    return undefined;
  }
};
