# Lambda: Timeout compatible with SQS trigger visibility timeout

## Why ?

When a consumer, a Lambda function in our case, receives and processes a message from a queue, the message remains in the queue. The message is deleted only if the consumer indicates to the SQS that the processing has ended.

To prevent other consumers from processing the message again, Amazon SQS sets a visibility timeout, a period of time during which Amazon SQS prevents all consumers from receiving and processing the message. The default visibility timeout for a message is 30 seconds.

If the processing time of your Lambda is bigger than the visibility timeout of the SQS your messages may be processes twice!

Here is a schematic explanation with an SQS with default visibility timeout (30s) consumed by a Lambda with an average processing time of 40s.

![visibility timeout](https://raw.githubusercontent.com/sls-mentor/sls-mentor/main/packages/core/src/rules/timeoutSmallEnoughForSqsVisibility/assets/visibility-timeout.gif 'visibility timeout explained')

That's why the timeout of your Lambda should always be shorter than the visibility timeout of the queue. AWS recommends setting the source queue's visibility timeout to at least six times the timeout of your Lambda, in particular to leave time for retry.

## How to fix ?

You either need to change the timeout of the lambda or the visibility timeout of the SQS.

## Useful links

- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
- https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
