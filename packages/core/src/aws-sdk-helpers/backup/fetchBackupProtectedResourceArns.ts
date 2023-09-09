import {
  GetBackupSelectionCommand,
  ListBackupPlansCommand,
  ListBackupSelectionsCommand,
} from '@aws-sdk/client-backup';
import { CustomARN } from '../../types';
import { backupClient } from '../../clients';

const fetchBackupProtectedResourceArns = async (): Promise<CustomARN[]> => {
  const backupPlansIds = await fetchBackupPlanIds();

  const backupSelections = await Promise.all(
    backupPlansIds.map(backupPlanId =>
      fetchBackupPlanBackupSelections(backupPlanId),
    ),
  );

  const protectedResourcesArns = await Promise.all(
    backupPlansIds.map(
      async (backupPlanId, index) =>
        await Promise.all(
          backupSelections[index].map(
            async backupSelectionId =>
              await fetchBackupProtectedResourcesArn(
                backupPlanId,
                backupSelectionId,
              ),
          ),
        ),
    ),
  );

  return protectedResourcesArns.flat(2).map(CustomARN.fromArnString);
};

const fetchBackupPlanIds = async (): Promise<string[]> => {
  const listBackupPlansCommand = new ListBackupPlansCommand({});
  const listBackupPlansResponse = await backupClient.send(
    listBackupPlansCommand,
  );
  if (listBackupPlansResponse.BackupPlansList === undefined) return [];

  return listBackupPlansResponse.BackupPlansList.map(
    backupPlan => backupPlan.BackupPlanId ?? '',
  );
};

const fetchBackupPlanBackupSelections = async (
  backupPlanId: string,
): Promise<string[]> => {
  const listBackupSelectionsCommand = new ListBackupSelectionsCommand({
    BackupPlanId: backupPlanId,
  });
  const listBackupSelectionsResponse = await backupClient.send(
    listBackupSelectionsCommand,
  );
  if (listBackupSelectionsResponse.BackupSelectionsList === undefined)
    return [];

  return listBackupSelectionsResponse.BackupSelectionsList.map(
    backupSelection => backupSelection.SelectionId ?? '',
  );
};

const fetchBackupProtectedResourcesArn = async (
  backupPlanId: string,
  selectionId: string,
): Promise<string[]> => {
  const getBackupSelectionCommand = new GetBackupSelectionCommand({
    BackupPlanId: backupPlanId,
    SelectionId: selectionId,
  });
  const getBackupSelectionResponse = await backupClient.send(
    getBackupSelectionCommand,
  );
  const { BackupSelection: backupSelection } = getBackupSelectionResponse;
  if (backupSelection?.Resources === undefined) return [];

  return backupSelection.Resources;
};

export default fetchBackupProtectedResourceArns;
