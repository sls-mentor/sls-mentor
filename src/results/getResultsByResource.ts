import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import {
  ChecksResults,
  FailedRule,
  ResourceResult,
  RuleCheckResult,
} from '../types';

const getResourcesArnsCheckedByGuardian = (results: ChecksResults): string[] =>
  uniq(results.flatMap(({ result }) => result.map(({ arn }) => arn)));

const getExtrasFromRuleResult = (
  result: RuleCheckResult,
): Record<string, unknown> => omit(result, 'arn', 'success');

const getRulesFailedByResource = (
  resourceArn: string,
  results: ChecksResults,
): FailedRule[] =>
  results.flatMap(({ rule, result }) => {
    const resultMatchingWithResource = result.find(
      ({ arn }) => arn === resourceArn,
    );
    if (!resultMatchingWithResource || resultMatchingWithResource.success)
      return [];
    const extras = getExtrasFromRuleResult(resultMatchingWithResource);

    return [
      {
        rule,
        extras,
      },
    ];
  });

export const getResultsByResource = (
  results: ChecksResults,
): ResourceResult[] => {
  const checkedResourcesArns = getResourcesArnsCheckedByGuardian(results);

  const resultsByResource = checkedResourcesArns.map(resourceArn => {
    const failedRules = getRulesFailedByResource(resourceArn, results);

    return {
      failedRules,
      resourceArn,
    };
  });

  return resultsByResource.filter(({ failedRules }) => failedRules.length > 0);
};
