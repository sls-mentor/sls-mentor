import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import {
  ChecksResults,
  CustomARN,
  FailedRule,
  ResourceResult,
  RuleCheckResult,
} from '../types';

const getResourcesArnsCheckedBySlsMentor = (
  results: ChecksResults,
): CustomARN[] =>
  uniqBy(
    results.flatMap(({ result }) => result.map(({ arn }) => arn)),
    arn => arn.toString,
  );

const getExtrasFromRuleResult = (
  result: RuleCheckResult,
): Record<string, unknown> => omit(result, 'arn', 'success');

const getRulesFailedByResource = (
  resourceArn: CustomARN,
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
  const checkedResourcesArns = getResourcesArnsCheckedBySlsMentor(results);

  const resultsByResource = checkedResourcesArns.map(resourceArn => {
    const failedRules = getRulesFailedByResource(resourceArn, results);

    return {
      failedRules,
      resourceArn,
    };
  });

  return resultsByResource.filter(({ failedRules }) => failedRules.length > 0);
};
