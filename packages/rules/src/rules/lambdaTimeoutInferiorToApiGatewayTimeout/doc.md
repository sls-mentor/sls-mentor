# No Functions Have Timeout Configuration Inferior To API Gateway Timeout

## Why ?

This rule checks that the timeout of the Lambda function is inferior to the timeout of any API Gateway integration that is using this Lambda function.

API Gateway integrations have a default timeout of 29 (REST) or 30 seconds (HTTP). AWS Lambda functions have a default timeout of 3 seconds, and a maximum timeout of 15 minutes. This means that you can specify a longer timeout on the Lambda function than on the API Gateway integration. In such cases, if the API Gateway integration times out before the Lambda function, the client will receive a 504 error, but the lambda will continue to run until it times out. This can lead to useless computation time and costs.

## How to fix ?

To fix this issue, you need to set the timeout of the Lambda function to a value that is inferior to the timeout of the API Gateway integration.

If your Lambda takes longer than the maximum api gateway timeout, you might want to consider using a different integration pattern, such as asynchronous invocation or AWS Step Functions.

### Console

You can change the timeout of your lambda directly from the console. See [AWS documentation on timeout configuration](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-timeout-console)

### CDK:

```ts
new lambda.Function(this, 'Function', {
  timeout: cdk.Duration.seconds(28),
});
```

### CloudFormation:

```yaml
Function:
  Type: AWS::Lambda::Function
  Properties:
    Timeout: 28
```

### Terraform:

```hcl
resource "aws_lambda_function" "function" {
  timeout = 28
}
```

## Useful links

API Gateway limits (such as maximum integration timeout): https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#apigateway-execution-service-limits-table

Tackle API Gateway timeout issues with Lambda step functions: https://community.aws/posts/How-to-tackle-time-out-on-api-gateway-using-step-functions-and-SAM
