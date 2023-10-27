import { paginateListRoles, Role } from '@aws-sdk/client-iam';

import { IamRoleARN } from '@sls-mentor/arn';

import { iamClient } from 'clients';

export const listIamRoles = async (): Promise<IamRoleARN[]> => {
  const iamRoles: Role[] = [];

  for await (const resources of paginateListRoles({ client: iamClient }, {})) {
    iamRoles.push(...(resources.Roles ?? []));
  }

  return iamRoles
    .map(({ RoleName }) => RoleName)
    .filter((roleName): roleName is string => roleName !== undefined)
    .map(roleName => IamRoleARN.fromRoleName(roleName));
};
