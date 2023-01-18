# Specify a Dead Letter Queue on your Event Bridge Rule targets

A [dead letter queue](https://en.wikipedia.org/wiki/Dead_letter_queue) is a queue for you to put error message and handle manually or automatically. If you don't specify any on an Event Bridge Rule target, error messages will be lost.

See AWS Documentation about [event retry policy and DLQ](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html)

## Suggested Actions:

- If you use CDK, you can follow [this example](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events_targets-readme.html#event-retry-policy-and-using-dead-letter-queues).

```ts
rule.addTarget(
  new targets.LambdaFunction(fn, {
    deadLetterQueue: queue, // <-- HERE
);
```

- If you use the Serverless Framework, [you can easily add DLQ to your Event Bridge Rules targets](https://www.serverless.com/framework/docs/providers/aws/events/event-bridge).

```yaml
functions:
  myFunction:
    handler: index.handler
    events:
      - eventBridge:
          eventBus: custom-saas-events
          pattern:
            source:
              - saas.external
          deadLetterQueueArn: # <-- HERE
            Fn::GetAtt:
              - QueueName
              - Arn
```
