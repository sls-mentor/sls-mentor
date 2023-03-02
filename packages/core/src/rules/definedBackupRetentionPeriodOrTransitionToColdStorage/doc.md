# _Backup_: Defined Backup Retention Period or Transition to Cold Storage

Make sure you do not forgot to set a retention period or at least a transition to cold storage date for each rule of your backup plan! You certainly don't need to keep backups for an indefinite period, especially on your dev and staging environments. 😉  
Avoid unnecessary data storage by setting a transition to cold storage date and/or a retention period! ⏰

---

Look into your Backup Plan in your AWS Backup service and open a Backup Rule. Here you can see the lifecycle configuration of the rule: Transition to cold storage and Retention period.
## Suggested Actions:

- If you use AWS CloudFormation you should use this documentation to add a "Lifecycle" key to your BackupRule: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-backup-backupplan-lifecycleresourcetype.html

- For AWS CDK: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-backup.BackupPlanRuleProps.html 
