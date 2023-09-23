import {
  GetBackupPlanCommand,
  GetBackupPlanOutput,
} from '@aws-sdk/client-backup';

import { BackupPlanARN, CustomARN } from '@sls-mentor/arn';

import { backupClient } from 'clients';

const fetchBackupPlanConfigurationByArn = async (
  arn: BackupPlanARN,
): Promise<{
  arn: BackupPlanARN;
  configuration: GetBackupPlanOutput;
}> => ({
  arn,
  configuration: await backupClient.send(
    new GetBackupPlanCommand({
      BackupPlanId: arn.getBackupPlanId(),
    }),
  ),
});

export const fetchAllBackupPlanConfigurations = async (
  resources: CustomARN[],
): Promise<
  {
    arn: BackupPlanARN;
    configuration: GetBackupPlanOutput;
  }[]
> => {
  const backupPlanArns = CustomARN.filterArns(resources, BackupPlanARN);

  return await Promise.all(
    backupPlanArns.map(arn => fetchBackupPlanConfigurationByArn(arn)),
  );
};
