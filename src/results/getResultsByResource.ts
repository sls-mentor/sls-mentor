import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import {
  ChecksResults,
  FailedRule,
  GuardianARN,
  ResourceResult,
  RuleCheckResult,
} from '../types';

const getResourcesArnsCheckedByGuardian = (
  results: ChecksResults,
): GuardianARN[] =>
  uniqBy(
    results.flatMap(({ result }) => result.map(({ arn }) => arn)),
    arn => arn.toString,
  );

const getExtrasFromRuleResult = (
  result: RuleCheckResult,
): Record<string, unknown> => omit(result, 'arn', 'success');

const getRulesFailedByResource = (
  resourceArn: GuardianARN,
  results: ChecksResults,
): FailedRule[] =>
  results.flatMap(({ rule, result }) => {
    const resultMatchingWithResource = result.find(({ arn }) =>
      arn.is(resourceArn),
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
