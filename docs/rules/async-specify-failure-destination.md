# `Async Lambdas: specify a failure destination`

Async calls to lambdas don't provide any response to the resource that preformed them.

That's why there should always be a failure destination specified for all your asynchronous Lambda, in order to be able to process the potential failure of any call.

## How to fix the issue

Here are resources to help you solve the issue on your project:

- [Cloudformation documentation - onFailure](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-eventinvokeconfig-destinationconfig-onfailure.html)
- [CDK user guide - Lambda destination](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_destinations-readme.html)
- [Serverless framework - Lambda destination](https://www.serverless.com/framework/docs/providers/aws/guide/functions#destinations)

Don't see your framework or development tool? Open an issue for documentation improvement
