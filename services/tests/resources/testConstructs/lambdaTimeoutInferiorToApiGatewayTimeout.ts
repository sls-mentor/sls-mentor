import { Duration } from 'aws-cdk-lib';
import {
  LambdaIntegration,
  RestApi,
  TokenAuthorizer,
} from 'aws-cdk-lib/aws-apigateway';
import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { lambdaTimeoutInferiorToApiGatewayTimeout as LambdaTimeoutInferiorToApiGatewayTimeoutRule } from '@sls-mentor/rules';

import { DefaultFunction } from 'resources/defaultConstructs';

type LambdaTimeoutInferiorToApiGatewayTimeoutProps = Pick<
  LambdaFunction,
  'timeout'
>;

export class LambdaTimeoutInferiorToApiGatewayTimeout extends Construct {
  static passTestCases: Record<
    string,
    LambdaTimeoutInferiorToApiGatewayTimeoutProps
  > = {
    'Lambda with short timeout': { timeout: Duration.seconds(28) },
  };

  static failTestCases: Record<
    string,
    LambdaTimeoutInferiorToApiGatewayTimeoutProps
  > = {
    'Lambda with long timeout': { timeout: Duration.seconds(29) },
  };

  constructor(
    scope: Construct,
    id: string,
    { timeout }: LambdaTimeoutInferiorToApiGatewayTimeoutProps,
  ) {
    super(scope, id);
    const lambdaFunction = new DefaultFunction(this, 'DefaultLambda', {
      timeout,
    });
    const api = new RestApi(this, 'DefaultApi');
    api.root.addMethod('GET', new LambdaIntegration(lambdaFunction), {
      authorizer: new TokenAuthorizer(this, 'DefaultAuthorizer', {
        handler: new DefaultFunction(this, 'DefaultAuthorizerLambda'),
      }),
    });

    lambdaFunction.tagRule(LambdaTimeoutInferiorToApiGatewayTimeoutRule);
  }
}
