import { InlineCode } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { noMonoPackage as NoMonoPackageRule } from '@sls-mentor/rules';

import { DefaultFunction } from '../defaultConstructs';

interface NoMonoPackageProps {
  quantityOfLambdaFunctionsSharingTheSamePackage: number;
}

export class NoMonoPackage extends Construct {
  static passTestCases: Record<string, NoMonoPackageProps> = {
    'One lambda': { quantityOfLambdaFunctionsSharingTheSamePackage: 1 },
  };

  static failTestCases: Record<string, NoMonoPackageProps> = {
    'Two lambdas': { quantityOfLambdaFunctionsSharingTheSamePackage: 2 },
  };

  constructor(
    scope: Construct,
    id: string,
    { quantityOfLambdaFunctionsSharingTheSamePackage }: NoMonoPackageProps,
  ) {
    super(scope, id);
    for (let i = 1; i <= quantityOfLambdaFunctionsSharingTheSamePackage; i++) {
      const lambdaFunctionDuplicate = new DefaultFunction(
        this,
        `LambdaFunctionDuplicate${i}`,
        {
          code: InlineCode.fromInline(
            'exports.handler = (event, context, callback) => { callback(null, "hello world") }',
          ),
        },
      );
      lambdaFunctionDuplicate.tagRule(NoMonoPackageRule);
    }
  }
}
