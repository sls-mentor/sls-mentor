import { fetchAllIamRolePolicies, Policy } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const getPoliciesWithWildcardResource = (
  policies: { policy: Policy; policyName: string }[],
): string[] => {
  const invalidPolicies = policies
    .map(({ policy, policyName }) => {
      const statement = policy.Statement;
      if (statement === undefined) {
        return undefined;
      }
      const isStatementInvalid = statement
        .map(({ Effect, Resource }) => {
          if (
            Effect === 'Allow' &&
            Resource instanceof String &&
            Resource === '*'
          ) {
            return false;
          }
          if (
            Effect === 'Allow' &&
            Resource instanceof Array &&
            Resource.includes('*')
          ) {
            return false;
          }

          return true;
        })
        .includes(false);

      return isStatementInvalid ? policyName : undefined;
    })
    .filter(invalidPolicyName => invalidPolicyName !== undefined);

  return invalidPolicies as string[];
};

const run: Rule['run'] = async resourceArns => {
  const iamRolePolicies = await fetchAllIamRolePolicies(resourceArns);
  const results = iamRolePolicies.map(({ arn, policies }) => {
    const invalidPolicies = getPoliciesWithWildcardResource(policies ?? []);

    return {
      arn,
      success: invalidPolicies.length === 0,
      invalidPolicies,
    };
  });

  return { results };
};

export const noIAMRolePolicyWithWildcardResource: Rule = {
  ruleName: 'IAM: no IAM Role Policy with wildcard Resource',
  errorMessage:
    'At least one inline policy of this role contains an action allowed on any resource of the account (*)',
  run,
  fileName: 'noIAMRolePolicyWithWildcardResource',
  categories: ['Security'],
  level: 2,
  service: 'IAM',
  easyToFix: true,
  severity: 'medium',
  stages: [Stage.prod, Stage.dev],
};
