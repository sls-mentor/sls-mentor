import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class BackupPlanARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.backup);
  }

  static fromBackupPlanId = (backupPlanId: string): BackupPlanARN =>
    new BackupPlanARN(`backup-plan:${backupPlanId}`);

  static fromPhysicalId = (physicalId: string): BackupPlanARN =>
    BackupPlanARN.fromBackupPlanId(physicalId);

  getBackupPlanId = (): string => {
    const backupPlanId = this.resource.split(':')[1];

    if (backupPlanId === undefined) {
      throw new Error('Invalid Backup Plan ARN');
    }

    return backupPlanId;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.backup &&
    arn.resource.startsWith('backup-plan:');

  static fromCustomARN = (arn: CustomARN): BackupPlanARN => {
    if (!BackupPlanARN.is(arn)) {
      throw new Error('Invalid Backup Plan ARN');
    }

    return new BackupPlanARN(arn.resource);
  };
}
