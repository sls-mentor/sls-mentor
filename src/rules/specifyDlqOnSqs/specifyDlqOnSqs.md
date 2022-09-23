# Specify a Dead Letter Queue on your SQS

A [dead letter queue](https://en.wikipedia.org/wiki/Dead_letter_queue) is a queue for you to put error message and handle manually or automatically. If you don't specify any on an SQS, error messages will be lost.

## Suggested Actions:

- If you use CDK, you can follow [this example](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.Queue.html#example).
