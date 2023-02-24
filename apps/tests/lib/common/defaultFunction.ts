import { Rule } from '@sls-mentor/core';
import { Names, Tags } from 'aws-cdk-lib';
import {
  Architecture,
  CfnFunction,
  Function,
  FunctionProps,
  InlineCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { RULE_TAG_KEY, Tagger } from './tags';

export class DefaultFunction extends Function implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<FunctionProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<FunctionProps, Partial<FunctionProps>>(
        {
          architecture: Architecture.ARM_64,
          code: InlineCode.fromInline(
            `exports.handler = (event, context, callback) => { callback(null, "hello world from Lambda ${Names.uniqueId(
              scope,
            )}") }`,
          ),
          memorySize: 512,
          runtime: Runtime.NODEJS_16_X,
          handler: 'index.handler',
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnFunction).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
