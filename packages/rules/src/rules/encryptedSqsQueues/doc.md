# Documentation of encryptedSqsQueues

## Why ?

AWS SQS queues are now encrypted by default but this setting can be turned off. SQS queues could also be unencrypted if they were created before the default encryption setting was enabled. There are two types of encryption for SQS queues:

[Server-side encryption](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html) (SSE) lets you store sensitive data in encrypted queues. SSE protects the contents of messages in Amazon SQS queues using keys managed in AWS Key Management Service (KMS-SSE) or directly in SQS (SQS-SSE).

Amazon SQS allows you to turn off all queue encryption. Therefore, turning off KMS-SSE, will not automatically enable SQS-SSE. If you wish to enable SQS-SSE after turning off KMS-SSE, you must add an attribute change in the request.

Reasons to encrypt your SQS queues are:

- To protect the contents of messages in Amazon SQS queues using keys managed in AWS Key Management Service (AWS KMS).
- To meet compliance and regulatory requirements.
- To protect your data from unauthorized access.
- To protect your data at rest.

This rule checks that all SQS queues are encrypted.

## How to fix ?

### Console

1. Open the Amazon SQS console at https://console.aws.amazon.com/sqs/.
2. In the navigation pane, choose Queues.
3. Choose a queue, and then choose Edit.
4. Expand Encryption.
5. For Server-side encryption, choose Enabled (default).
6. Select Amazon SQS key (SSE-SQS). There is no additional fee for using this option.
7. Choose Save.

See: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html

### CDK:

Newly created queues are encrypted by default. To encrypt an existing queue, you need to enable encryption on the SQS queue, by setting the `encryption` property to `sqs.QueueEncryption.SQS_MANAGED`.

```ts
import * as sqs from 'aws-cdk-lib/aws-sqs';

const queue = new sqs.Queue(this, 'Queue', {
  encryption: sqs.QueueEncryption.SQS_MANAGED,
});
```

### CloudFormation:

```yaml
Queue:
  Type: AWS::SQS::Queue
  Properties:
    SqsManagedSseEnabled: true
```

See: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html

### Terraform:

```hcl
resource "aws_sqs_queue" "terraform_queue" {
  name                    = "terraform-example-queue"
  sqs_managed_sse_enabled = true
}
```

See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue#server-side-encryption-sse

## Useful links

https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html
