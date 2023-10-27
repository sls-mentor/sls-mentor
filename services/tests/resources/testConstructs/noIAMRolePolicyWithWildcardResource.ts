import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { noIAMRolePolicyWithWildcardResource as noIAMRolePolicyWithWildcardResourceRule } from '@sls-mentor/rules';

import { DefaultFunction } from 'resources/defaultConstructs';

interface NoIAMRolePolicyWithWildcardResourceProps {
  policy?: PolicyStatement[];
}

export class NoIAMRolePolicyWithWildcardResource extends Construct {
  static passTestCases: Record<
    string,
    NoIAMRolePolicyWithWildcardResourceProps
  > = {
    'lambda without given policy': {},
    'lambda with valid policy': {
      policy: [
        PolicyStatement.fromJson({
          Effect: 'Allow',
          Action: 'lambda:InvokeFunction',
          Resource:
            'arn:aws:lambda:eu-west-1:000000000000:function:specifiedLambda',
        }),
      ],
    },
  };

  static failTestCases: Record<
    string,
    NoIAMRolePolicyWithWildcardResourceProps
  > = {
    'lambda with invalid policy': {
      policy: [
        PolicyStatement.fromJson({
          Effect: 'Allow',
          Action: 'lambda:InvokeFunction',
          Resource: '*',
        }),
      ],
    },
  };

  constructor(
    scope: Construct,
    id: string,
    { policy }: NoIAMRolePolicyWithWildcardResourceProps,
  ) {
    super(scope, id);
    const lambdaFunction = new DefaultFunction(this, 'LambdaFunction', {
      initialPolicy: policy,
    });
    lambdaFunction.tagRule(noIAMRolePolicyWithWildcardResourceRule);
  }
}
