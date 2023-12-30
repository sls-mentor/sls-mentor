import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class IamRoleARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.iam);
  }

  static fromRoleName = (roleName: string): IamRoleARN =>
    new IamRoleARN(`role/${roleName}`);

  static fromPhysicalId = (physicalId: string): IamRoleARN =>
    IamRoleARN.fromRoleName(physicalId);

  getRoleName = (): string => {
    const roleName = this.resource.split('/')[1];

    if (roleName === undefined) {
      throw new Error('Invalid Iam Role ARN');
    }

    return roleName;
  };
}
