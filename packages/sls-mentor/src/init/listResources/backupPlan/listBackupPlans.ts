import {
  BackupPlansListMember,
  paginateListBackupPlans,
} from '@aws-sdk/client-backup';
import { backupClient, BackupPlanARN } from 'core';

export const listBackupPlans = async (): Promise<BackupPlanARN[]> => {
  const backupPlans: BackupPlansListMember[] = [];

  for await (const resources of paginateListBackupPlans(
    { client: backupClient },
    {},
  )) {
    backupPlans.push(...(resources.BackupPlansList ?? []));
  }

  return backupPlans
    .map(({ BackupPlanId }) => BackupPlanId)
    .filter(
      (BackupPlanId): BackupPlanId is string => BackupPlanId !== undefined,
    )
    .map(BackupPlanId => BackupPlanARN.fromBackupPlanId(BackupPlanId));
};
