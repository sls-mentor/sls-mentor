# Documentation of encryptedSnsTopics (update this file)

## Why ?

AWS SNS topics are not encrypted by default. This rule checks that all SNS topics are encrypted.
Server-side encryption (SSE) lets you store sensitive data in encrypted topics. SSE protects the contents of messages in Amazon SNS topics using keys managed in AWS Key Management Service (AWS KMS).

## How to fix ?

To fix this issue, you need to enable encryption on the SNS topic, by setting the `KmsMasterKeyId` property to a valid KMS key ARN.

### CDK:

```ts
new sns.Topic(this, 'Topic', {
  masterKey: kms.Key.fromKeyArn(
    this,
    'Key',
    'arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012',
  ),
});
```

### CloudFormation:

```yaml
Topic:
  Type: AWS::SNS::Topic
  Properties:
    KmsMasterKeyId: arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012
```

### Terraform:

```hcl
resource "aws_sns_topic" "topic" {
  kms_master_key_id = "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012"
}
```

## Useful links

https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms
