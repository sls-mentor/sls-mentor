import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { setupLambda } from './lambda';
import { setupS3 } from './s3';

export class SlsMentorE2EStackFail extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    setupLambda(this);
    setupS3(this);
  }
}
