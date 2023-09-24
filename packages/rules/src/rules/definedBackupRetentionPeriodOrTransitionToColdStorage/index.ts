import { fetchAllBackupPlanConfigurations } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const isRetentionPeriodOrTransitionToColdStorageDefinedForEachRule = (
  backupPlanConfiguration: Awaited<
    ReturnType<typeof fetchAllBackupPlanConfigurations>
  >[number]['configuration'],
): boolean => {
  const rules = backupPlanConfiguration.BackupPlan?.Rules ?? [];

  return rules.reduce(
    (arePreviousRulesValid, rule) =>
      arePreviousRulesValid &&
      (rule.Lifecycle?.DeleteAfterDays !== undefined ||
        rule.Lifecycle?.MoveToColdStorageAfterDays !== undefined),
    true,
  );
};

const run: Rule['run'] = async resourceArns => {
  const backupPlans = await fetchAllBackupPlanConfigurations(resourceArns);
  const results = backupPlans.map(({ arn, configuration }) => ({
    arn,
    success:
      isRetentionPeriodOrTransitionToColdStorageDefinedForEachRule(
        configuration,
      ),
  }));

  return { results };
};

export const definedBackupRetentionPeriodOrTransitionToColdStorage: Rule = {
  ruleName:
    'Backup: Defined Backup Retention Period or Transition to Cold Storage',
  errorMessage:
    'The backup plan has at least one backup rule without defined retention period and transition to cold storage',
  run,
  fileName: 'definedBackupRetentionPeriodOrTransitionToColdStorage',
  categories: ['GreenIT', 'ITCosts'],
  level: 3,
  service: 'Backup',
  easyToFix: true,
  severity: 'high',
};
