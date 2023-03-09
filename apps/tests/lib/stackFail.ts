import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as testConstructs from '@sls-mentor/core/tests';

export class StackFail extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    Object.entries(testConstructs).map(([constructName, RuleConstruct]) => {
      Object.entries(RuleConstruct.failTestCases).map(
        ([testCaseName, constructProps]) => {
          new RuleConstruct(
            this,
            constructName.concat(testCaseName),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            constructProps,
          );
        },
      );
    });
  }
}
