# Lambda: No Default Memory (no-default-memory)

Lambda Functions memory is configurable and should be configured for the use-case.
This can impact the speed and running cost of the Lambda Function.

> **Note:** Any increase in memory size triggers an equivalent increase in CPU available to your function

---

## Suggested Actions:

First, find out how much memory is needed for a specific lambda.

- you can cook into your CloudWatch Logs for the Lambda function to find the value of `Max Memory Used`. [For more information](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)

  ```
  REPORT RequestId: 3604209a-e9a3-11e6-939a-754dd98c7be3	Duration: 12.34 ms	Billed Duration: 100 ms Memory Size: 128 MB	Max Memory Used: 18 MB
  ```

- To automate this task, use a power-tune tool such as [aws-lambda-power-tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning)

Ressources to update a lambda a memory on different IaC framework:

- [Cloudformation - `Memory` property](https://docs.aws.amazon.com/fr_fr/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html#aws-resource-lambda-function-properties)
- [CDK - Lambda function `MemorySize` property](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html#construct-props)
- [Serverless framework - Lambda function `MemorySize` property](https://www.serverless.com/framework/docs/providers/aws/guide/functions)
