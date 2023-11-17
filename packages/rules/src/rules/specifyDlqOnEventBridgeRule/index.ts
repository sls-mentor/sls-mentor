import {
  CustomARN,
  EventBridgeEventBusARN,
  EventBridgeRuleARN,
} from '@sls-mentor/arn';
import {
  getAllRulesOfEventBus,
  getAllTargetsOfEventBridgeRule,
} from '@sls-mentor/aws-api';

import { Rule, Stage } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const eventBuses = CustomARN.filterArns(resourceArns, EventBridgeEventBusARN);

  const allEventBridgeRules = (
    await Promise.all(
      eventBuses.map(eventBus => getAllRulesOfEventBus(eventBus)),
    )
  ).flat();

  const allEventBridgeTargetsWithRule = await Promise.all(
    allEventBridgeRules.map(async rule => {
      const allTargetsOfEventBridgeRule =
        await getAllTargetsOfEventBridgeRule(rule);

      return {
        rule,
        targets: allTargetsOfEventBridgeRule,
      };
    }),
  );

  const results = allEventBridgeTargetsWithRule.map(({ rule, targets }) => {
    const doesTargetHaveDLQConfigured = targets.every(
      target => target.DeadLetterConfig !== undefined,
    );

    return {
      arn: EventBridgeRuleARN.fromRuleName(rule.Name ?? 'unknown_rule_arn'),
      success: doesTargetHaveDLQConfigured,
      eventBus: rule.EventBusName,
      targets: targets.map(target => target.Arn),
    };
  });

  return { results };
};

export const specifyDlqOnEventBridgeRule: Rule = {
  ruleName: 'Specifying a DLQ on EventBridge events targets',
  errorMessage:
    'The event bridge event rule targets do not all have a specified Dead Letter Queue',
  run,
  fileName: 'specifyDlqOnEventBridgeRule',
  categories: ['Stability'],
  level: 5,
  stages: [Stage.prod, Stage.dev],
  service: 'EventBridge',
  easyToFix: false,
  severity: 'medium',
};
