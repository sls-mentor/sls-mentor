/* eslint-disable complexity */
import {
  GetPolicyCommand,
  GetPolicyVersionCommand,
  GetRolePolicyCommand,
  paginateListAttachedRolePolicies,
  paginateListRolePolicies,
} from '@aws-sdk/client-iam';

import { CustomARN, IamRoleARN } from '@sls-mentor/arn';

import { Policy as PolicyType } from 'types/policy';

import { iamClient } from '../../clients';

const fetchIamRolePoliciesByArn = async (
  arn: IamRoleARN,
): Promise<{ policy: PolicyType; policyName: string }[] | undefined> => {
  try {
    const RoleName = arn.getRoleName();
    const iamRolePolicyNames: string[] = [];
    for await (const resources of paginateListRolePolicies(
      { client: iamClient },
      { RoleName },
    )) {
      iamRolePolicyNames.push(...(resources.PolicyNames ?? []));
    }

    return Promise.all(
      iamRolePolicyNames.map(async PolicyName => {
        const commandOutput = await iamClient.send(
          new GetRolePolicyCommand({ RoleName, PolicyName }),
        );
        const policy = JSON.parse(
          decodeURIComponent(
            decodeURIComponent(commandOutput.PolicyDocument ?? ''),
          ),
        ) as PolicyType;

        return { policy, policyName: PolicyName };
      }),
    );
  } catch (e) {
    return;
  }
};

const fetchIamRolePoliciesByAttachedPoliciesArn = async (
  arn: IamRoleARN,
): Promise<{ policy: PolicyType; policyName: string }[] | undefined> => {
  try {
    const RoleName = arn.getRoleName();

    const iamRolePolicies = [];
    for await (const resources of paginateListAttachedRolePolicies(
      { client: iamClient },
      { RoleName },
    )) {
      if (resources.AttachedPolicies === undefined) {
        return undefined;
      }

      for (const attachedPolicy of resources.AttachedPolicies) {
        const { Policy } = await iamClient.send(
          new GetPolicyCommand({ PolicyArn: attachedPolicy.PolicyArn }),
        );

        const policy = await iamClient.send(
          new GetPolicyVersionCommand({
            PolicyArn: Policy?.Arn,
            VersionId: Policy?.DefaultVersionId,
          }),
        );

        iamRolePolicies.push({
          policy: JSON.parse(
            decodeURIComponent(
              decodeURIComponent(policy.PolicyVersion?.Document ?? ''),
            ),
          ) as PolicyType,
          policyName: attachedPolicy.PolicyName ?? '',
        });
      }
    }

    return iamRolePolicies;
  } catch (e) {
    return;
  }
};

export const fetchAllIamRolePolicies = async (
  resourceArns: CustomARN[],
): Promise<
  { arn: IamRoleARN; policies?: { policy: PolicyType; policyName: string }[] }[]
> => {
  const iamRoles = CustomARN.filterArns(resourceArns, IamRoleARN);

  return await Promise.all(
    iamRoles.map(async arn => ({
      arn,
      policies: [
        ...((await fetchIamRolePoliciesByAttachedPoliciesArn(arn)) ?? []),
        ...((await fetchIamRolePoliciesByArn(arn)) ?? []),
      ],
    })),
  );
};
