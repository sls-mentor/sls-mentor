# DynamoDB: back up your tables regularly

DynamoDB is a NoSQL database service and as such it is widely used in any software application. It is recommended that you keep a secondary copy of the data stored in your database, in case of a primary data failure (e.g. introduction of corrupted data, handling mistakes etc.).
AWS Backup Service allows you to define Backup plans. These are periodically updated snapshots of the database, the state of which you can roll back your table to.

---

## Suggested Actions:

- In the AWS console, in the Backup service, create a BackupPlan;
- Configure the name of the Backup plan and the Backup Rules. These include when you run your Backup jobs, in what storage class you want to keep the Backups, in which AWS region you want them saved and your how long you retain them. If applicable to your use case, you might want to use the point in time recovery which backs up your table data automatically with per-second granularity
- After creating the plan, you can simply assign resources to this plan using the resource name. For the scope of this rule, you want to add the name of the DynamoDB table to back up.

## Links :

- https://aws.amazon.com/dynamodb/backup-restore/
- https://amazon-dynamodb-labs.workshop.aws/hands-on-labs/backups.html
- https://aws.amazon.com/backup/
- https://www.serverless.com/blog/automatic-dynamodb-backups-serverless
- https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_backup-readme.html
