import { CustomARN } from '../CustomARN';

export class BackupPlanARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'backup');
  }

  static fromBackupPlanId = (backupPlanId: string): BackupPlanARN =>
    new BackupPlanARN(`backup-plan:${backupPlanId}`);

  static fromPhysicalId = (physicalId: string): BackupPlanARN =>
    BackupPlanARN.fromBackupPlanId(physicalId);

  getBackupPlanId = (): string => this.resource.split(':')[1];
}
