import { lightBundle as LightBundleRule } from '@sls-mentor/core';
import { Fn } from 'aws-cdk-lib';
import { InlineCode } from 'aws-cdk-lib/aws-lambda';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { DefaultBucket, DefaultFunction } from '../common';

interface LightBundleProps {
  packageSize: number;
}

export class LightBundle extends Construct {
  constructor(scope: Construct, id: string, { packageSize }: LightBundleProps) {
    super(scope, id);
    const lambdaFunctionCodeBucket = new DefaultBucket(
      this,
      'LambdaFunctionCodeBucket',
    );
    const FILE_KEY = 'file';
    const lambdaCodeContent = [
      'exports.handler = (event, context, callback) => {',
    ];
    for (let i = 0; i < packageSize / 34; i++) {
      // the following line roughly weights 33 bytes
      lambdaCodeContent.push('console.log("hello world again!");');
    }
    lambdaCodeContent.push('callback(null, "hello world"); }');
    const codeDeployment = new BucketDeployment(this, 'BucketDeployment', {
      destinationBucket: lambdaFunctionCodeBucket,
      sources: [Source.data(FILE_KEY, lambdaCodeContent.join(''))],
      extract: false,
    });
    const lambdaFunction = new DefaultFunction(this, 'LambdaFunction', {
      code: InlineCode.fromBucket(
        lambdaFunctionCodeBucket,
        Fn.select(0, codeDeployment.objectKeys),
      ),
    });
    lambdaFunction.node.addDependency(codeDeployment);
    lambdaFunction.tagRule(LightBundleRule);
  }
}
