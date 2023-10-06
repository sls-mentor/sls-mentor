# Configure sls-mentor

sls-mentor runs out of the box with no necessary configuration.
However you might want to add configuration for it to fit your needs the best.

First you need to create a configuration file.
At the root of the project, create a `sls-mentor.json` file. sls-mentor will look for this file in the directory it's launched.

## Ignore resources

You can ask sls-mentor to ignore some resources when running a rule. To do so add the following in `sls-mentor.json`

```[json]
{
    rules: {
        RULE_NAME: {
            ignoredResources: [reqex patterns to ignore...]
        }
    }
}
```

ignoredResources accepts an array of regex that you wish to ignore. You can either add your resource full ARN or pattern matching the resources you wish to ignore.

The rule name should be one of the following list:

| Rule | Name for configuration file |
  | :- | :- |
  | SES: assign default configuration set | assignDefaultConfigurationSet |
  | Lambda: Specify Failure Destination for Async Functions | asyncSpecifyFailureDestination |
  | Autoscaling is possible for RDS instances | autoscaleRdsInstanceEnabled |
  | CloudFront: use only https or redirect http to https on the cache behaviors of your distributions | cloudFrontNoHttp |
  | CloudFront: your distributions should be associated with a SSL certificate (ACM or IAM). | cloudFrontSSLCertificate |
  | CloudFront: use SecurityHeadersPolicy on the cache behaviors of your distributions | cloudFrontSecurityHeaders |
  | User Pools enforce passwords of at least 10 characters | cognitoEnforceLongPasswords |
  | Cognito: use case insensitivity on the username input | cognitoSignInCaseInsensitivity |
  | SES configuration sets should enable suppression list  | configurationSetEnableSuppresionList |
  | SES: Custom MAIL FROM Domain | customMailFromDomain |
  | Backup: Defined Backup Retention Period or Transition to Cold Storage | definedBackupRetentionPeriodOrTransitionToColdStorage |
  | CloudWatch Logs: Define a retention duration | definedLogsRetentionDuration |
  | DynamoDB: Define a backup configuration | dynamodbBackupConfig |
  | Enable block public access | enableBlockPublicAccess |
  | Enable the Deletion protection on DynamoDB tables | enableDeletionProtectionOnDynamoDBTables |
  | SES : Reputation Metrics Enabled on Configuration Set | enableReputationMetrics |
  | SNS: Topics should be encrypted | encryptedSnsTopics |
  | SQS: Queues should be encrypted | encryptedSqsQueues |
  | Lambda: Light Bundle | lightBundle |
  | Lambda: Limited Amount of Versions | limitedAmountOfVersions |
  | Lambda: No Deprecated Runtime | noDeprecatedRuntime |
  | IAM: no IAM Role Policy with wildcard Resource | noIAMRolePolicyWithWildcardResource |
  | Lambda: No Maximum Timeout | noMaxTimeout |
  | Lambda: No Mono Package | noMonoPackage |
  | Lambda: No Provisioned Concurrency | noProvisionedConcurrency |
  | Lambda: No Shared IAM Roles | noSharedIamRoles |
  | Api Gateway V2: Use Authorized Routes | noUnauthorizedApiGatewaysV2Routes |
  | Rest Api Gateway: Use Authorized Routes | noUnauthorizedRestApiGatewaysRoutes |
  | SES: No Email Identities | noSESEmailIdentity |
  | S3: Use HTTPS requests only | s3OnlyAllowHTTPS |
  | SNS: Subscription has redrive policy | snsRedrivePolicy |
  | Specifying a DLQ on EventBridge events targets | specifyDlqOnEventBridgeRule |
  | Specifying a DLQ on SQS | specifyDlqOnSqs |
  | Lambda: Timeout compatible with SQS trigger visibility timeout | timeoutSmallEnoughForSqsVisibility |
  | Lambda: Under Maximum Memory | underMaxMemory |
  | Lambda: Use an ARM Architecture | useArm |
  | S3: Use Intelligent Tiering | useIntelligentTiering |

For example you can add the following:

```[json]
{
    rules: {
        noSharedIamRoles: {
            ignoredResources: [
                'arn:aws:lambda:us-west-2:123456789012:function:my-function',
                'arn:aws:lambda:us-west-1:.*'
             ]
        }
    }
}
```
