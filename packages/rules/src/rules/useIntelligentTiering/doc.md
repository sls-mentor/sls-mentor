# S3: use Intelligent-Tiering

The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective access tier. For a small monthly charge, S3 Intelligent-Tiering monitors access patterns and automatically moves objects that have not been accessed for a long time to lower-cost access tiers.

# Suggested Actions

Create an Intelligent-Tiering configuration either with your favorite tool. The following [Cloudformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html) could be used:

```json
{
  "Type": "AWS::S3::Bucket",
  "Properties": {
    "BucketName": "my-bucket",
    "LifecycleConfiguration": {
      "Rules": [
        {
          "Id": "TransitionToIntelligentTiering",
          "Status": "Enabled",
          "Transitions": [
            {
              "StorageClass": "INTELLIGENT_TIERING",
              "TransitionInDays": 0
            }
          ]
        }
      ]
    }
  }
}
```

# Useful links

- Extensive documentation on S3 storage classes and the dynamic data access: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-dynamic-data-access
