# _S3_: use HTTPS requests only

Amazon S3 allows both HTTP and HTTPS requests. In order to ensure data protection, it is important to make sure data is encrypted at rest (server-side encryption) and in-transit. This rule deals with in-transit encryption.
In transit encryption is enforced by using the HTTPS protocol, which allows TLS/SSL transport encryption.

## Suggested Actions

Go to your problematic S3 bucket. In the Permissions tabs, add a policy statement setting "Effect" to "deny" and "Condition.Bool.aws:SecureTransport" to "false". See the example below.

Be careful when editing the file, as certain parameter configurations may prevent you from accessing the bucket (e.g. "Effect": "deny" and "aws:SecureTransport": "true").

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["resourcename1/*", "resourcename2"],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

# Useful links

- Documentation on protection of buckets by defining the adequate policies: https://aws.amazon.com/blogs/security/how-to-use-bucket-policies-and-apply-defense-in-depth-to-help-secure-your-amazon-s3-data/
- How to configure the bucket policy: https://repost.aws/knowledge-center/s3-bucket-policy-for-config-rule
