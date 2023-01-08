import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { setupCloudfront } from './cloudfront';
import { setupS3 } from './s3';

export class SlsMentorFrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucket = setupS3(this);
    setupCloudfront(this, bucket);
  }
}
