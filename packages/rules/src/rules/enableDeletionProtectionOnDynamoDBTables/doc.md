# Enable Deletion Protection On DynamoDB Tables

## Why ?

Enabling this property for tables helps ensure that tables do not get accidentally deleted during regular table management operations by your administrators. This will help prevent disruption to your normal business operations.

## How to fix ?

### In the AWS console:

To change this setting, go to the table’s Additional settings, navigate to the Deletion Protection panel and select Enable delete protection.

![deletion protection parameter in the console](https://github.com/sls-mentor/sls-mentor/blob/master/packages/core/src/rules/enableDeletionProtectionOnDynamoDBTables/assets/aws-console-deletion-protection.png 'deletion protection parameter in the console')

### AWS CDK

When instanciating the table, set the `deletionProtection` parameter to `true`.

```
const table = new dynamodb.Table(this, id, {
    ...props,
    deletionProtection: true,
});
```

### Cloudformation / Serverless Framework

You need to modify the CloudFormation template directly.

```
Resources:
    myDynamoDBTable:
        Type: AWS::DynamoDB::Table
        Properties:
            DeletionProtectionEnabled: True
```

## Useful links

_Source: [AWS Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html#WorkingWithTables.Basics.DeletionProtection)_
