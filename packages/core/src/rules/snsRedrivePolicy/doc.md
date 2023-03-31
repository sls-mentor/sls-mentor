# Specify a Redrive policy for your SNS subscription

You can configure the redrive policy on an Amazon SNS subscription. If SNS cannot deliver the message after the number of attempts set in its delivery policy, SNS will send it to the dead-letter queue specified in the redrive policy.

A [dead letter queue](https://en.wikipedia.org/wiki/Dead_letter_queue) is a queue for you to put error message and handle manually or automatically.

See AWS Documentation about [sns redrive policy](https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html)

## Suggested Actions:

- Example in cdk

```ts
const snsSubscription = new Subscription('snsSubscription', {
  deadLetterQueue: myDlq,
});
```
