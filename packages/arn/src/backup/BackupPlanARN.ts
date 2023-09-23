import { CustomARN } from '../CustomARN';

export class BackupPlanARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'backup');
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
}
