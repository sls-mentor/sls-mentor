# _S3_: Server-side Encryption Enabled

There are 4 different solutions to provide encryption at rest of the data stored in S3:

- client-side encryption: encrypting the file before pushing them on S3
- server-side encryption - `SSE-S3`: S3 manages the key to encrypt the data at rest, after its being encrypted
- server-side encryption - `SSE-KMS`: KMS is used to generate a master key that will be used to encrypt the data at rest
- server-side encryption - `SSE-C`: you provide your own encryption key

| Criterion \ Encryption solution    |          Client-side          | SSE-S3 | SSE-KMS | SSE-C  |
| ---------------------------------- | :---------------------------: | :----: | :-----: | :----: |
| Cost                               |             Free              |  Free  |   💶    |   💶   |
| No additional development required |              ❌               |   ✅   |   ✅    |   ❌   |
| Security                           | Depends on the implementation |   🔒   |  🔒🔒   | 🔒🔒🔒 |

We recommand using `SSE-S3`, as it provides a mechanism of data encryption at rest, fully managed by AWS, at no additional cost, without requiring any additional development.

The `Server-side Encryption Enabled` rule check that [server-side encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html) is enabled on your bucket regardless of the solution chosen among `SSE-S3`, `SSE-KM`, `SSE-C`.

# Suggested Action

Look into your bucket in your S3 service to find `Default encryption` in the Properties tab.

Ressources to update the encryption of your bucket on different IaC framework:

- [CDK](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketEncryption.html)
- [Serverless](https://www.serverless.com/plugins/serverless-s3-encryption)

# Useful links

- Documentation on S3 server-side encryption: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
