import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as rulesTestConstructs from './testConstructs';

export class StackSuccess extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    Object.entries(rulesTestConstructs).forEach(
      ([constructName, RuleConstruct]) => {
        Object.entries(RuleConstruct.passTestCases).forEach(
          ([testCaseName, constructProps]) => {
            new RuleConstruct(
              this,
              constructName.concat(testCaseName),
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              constructProps,
            );
          },
        );
      },
    );
  }
}
