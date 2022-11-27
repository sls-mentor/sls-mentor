import {
  getAllRulesOfEventBus,
  getAllTargetsOfEventBridgeRule,
} from '../../aws-sdk-helpers';
import {
  Category,
  EventBridgeEventBusARN,
  GuardianARN,
  Rule,
  RuleCheckResult,
} from '../../types';

const run: Rule['run'] = async resourceArns => {
  const eventBuses = GuardianARN.filterArns(
    resourceArns,
    EventBridgeEventBusARN,
  );

  const allEventBridgeRules = (
    await Promise.all(
      eventBuses.map(eventBus => getAllRulesOfEventBus(eventBus)),
    )
  ).flat();

  const allEventBridgeTargetsWithRule = await Promise.all(
    allEventBridgeRules.map(async rule => {
      const allTargetsOfEventBridgeRule = await getAllTargetsOfEventBridgeRule(
        rule,
      );

      return {
        rule,
        targets: allTargetsOfEventBridgeRule,
      };
    }),
  );

  const results: RuleCheckResult[] = allEventBridgeTargetsWithRule.map(
    ({ rule, targets }) => {
      const doesTargetHaveDLQConfigured = targets.every(
        target => target.DeadLetterConfig !== undefined,
      );

      return {
        arn: rule.Arn ?? 'unknown rule arn',
        success: doesTargetHaveDLQConfigured,
        eventBus: rule.EventBusName,
        targets: targets.map(target => target.Arn),
      };
    },
  );

  return { results };
};

const rule: Rule = {
  ruleName: 'Specifying a DLQ on EventBridge events targets',
  errorMessage:
    'The event bridge event rule targets do not all have a specified Dead Letter Queue',
  run,
  fileName: 'specifyDlqOnEventBridgeRule',
  categories: [Category.STABILITY],
};

export default rule;
