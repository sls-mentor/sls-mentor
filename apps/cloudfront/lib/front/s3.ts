import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export const STATIC_WEBSITE_BUCKET_NAME = 'StaticWebsiteHostingBucket';
export const STATIC_WEBSITE_DEPLOYMENT_NAME = 'StaticWebsiteHostingDeployment';

export const setupS3 = (stack: Stack): Bucket => {
  const bucket = new Bucket(stack, STATIC_WEBSITE_BUCKET_NAME, {
    publicReadAccess: true,
    removalPolicy: RemovalPolicy.DESTROY,
    websiteIndexDocument: 'index.html',
  });

  new BucketDeployment(stack, STATIC_WEBSITE_DEPLOYMENT_NAME, {
    sources: [Source.asset('../documentation/build')],
    destinationBucket: bucket,
  });

  return bucket;
};
