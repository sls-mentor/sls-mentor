import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';
import {
  DefaultEventBridgeRule,
  DefaultFunction,
  DefaultSqsQueue,
} from '../../../tests/constructs';
import { specifyDlqOnEventBridgeRule as SpecifyDlqOnEventBridgeRule } from './index';

interface SpecifyDlqOnEventBridgeProps {
  eventBridgeRuleHasTargetWithDlq: boolean;
}

export class SpecifyDlqOnEventBridge extends Construct {
  static passTestCases: Record<string, SpecifyDlqOnEventBridgeProps> = {
    'Defined dlq for target of EventBridge Rule': {
      eventBridgeRuleHasTargetWithDlq: true,
    },
  };

  static failTestCases: Record<string, SpecifyDlqOnEventBridgeProps> = {
    'No dlq for target of EventBridge Rule': {
      eventBridgeRuleHasTargetWithDlq: false,
    },
  };

  constructor(
    scope: Construct,
    id: string,
    { eventBridgeRuleHasTargetWithDlq }: SpecifyDlqOnEventBridgeProps,
  ) {
    super(scope, id);
    const eventBridgeRule = new DefaultEventBridgeRule(scope, `Rule`, {
      targets: eventBridgeRuleHasTargetWithDlq
        ? [
            new LambdaFunction(
              new DefaultFunction(scope, 'targetA', {
                deadLetterQueue: new DefaultSqsQueue(
                  scope,
                  'dlqRuleEvenBridge',
                ),
              }),
            ),
          ]
        : [new LambdaFunction(new DefaultFunction(scope, 'targetB'))],
    });
    eventBridgeRule.tagRule(SpecifyDlqOnEventBridgeRule);
  }
}
