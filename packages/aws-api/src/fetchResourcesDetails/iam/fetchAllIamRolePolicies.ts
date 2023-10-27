import {
  GetRolePolicyCommand,
  paginateListRolePolicies,
} from '@aws-sdk/client-iam';

import { CustomARN, IamRoleARN } from '@sls-mentor/arn';

import { Policy } from 'types/policy';

import { iamClient } from '../../clients';

const fetchIamRolePoliciesByArn = async (
  arn: IamRoleARN,
): Promise<{ policy: Policy; policyName: string }[] | undefined> => {
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
        ) as Policy;

        return { policy, policyName: PolicyName };
      }),
    );
  } catch (e) {
    return;
  }
};

export const fetchAllIamRolePolicies = async (
  resourceArns: CustomARN[],
): Promise<
  { arn: IamRoleARN; policies?: { policy: Policy; policyName: string }[] }[]
> => {
  const iamRoles = CustomARN.filterArns(resourceArns, IamRoleARN);

  return Promise.all(
    iamRoles.map(async arn => ({
      arn,
      policies: await fetchIamRolePoliciesByArn(arn),
    })),
  );
};
