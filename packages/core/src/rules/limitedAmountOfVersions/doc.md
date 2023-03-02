# `Limited Amount of Lambda versions`

This rules concerns mostly Serverless framework users.
[Every time you deploy a lambda with the serverless framework, a new version is created and uploaded on an S3.](https://www.serverless.com/framework/docs/providers/aws/guide/functions/#versioning-deployed-functions)
On the other hand AWS has a quota of 75GB of lambda code that can be stored per account.

On a stack the number of version can go up quite quickly and sometime cause a Limit Exceeded when trying to deploy.
To save all these versions, you will consume unnecessary resources and run your CO2 consumption higher.

[If you use CDK to deploy lambda code, by default, versions will overwrite each others](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.VersionOptions.html#removalpolicy). If you override the Retention Strategy, this error might pop on your stack.

## How to fix the issue

sls-mentor checks if you have 5 versions or less for each lambda.
To solve this you can:

1. [Disable Serverless default setting to not save all versions](https://www.serverless.com/framework/docs/providers/aws/guide/functions/#versioning-deployed-functions)
2. Prune regurlaly lambda versions using [Serverless Prune Plugin](https://github.com/claygregory/serverless-prune-plugin) for instance
