import {
  EventBridge,
  ListTargetsByRuleCommandOutput,
  Rule,
  Target,
} from '@aws-sdk/client-eventbridge';

export const getAllTargetsOfEventBridgeRule = async (
  eventBridgeRule: Rule,
  eventBridgeClient: EventBridge,
): Promise<Target[]> => {
  const allTargetsOfEventBridgeRule: Target[] = [];

  let listTargetsByRuleResult: ListTargetsByRuleCommandOutput;
  let nextToken: string | undefined = undefined;

  do {
    listTargetsByRuleResult = await eventBridgeClient.listTargetsByRule({
      EventBusName: eventBridgeRule.EventBusName,
      Rule: eventBridgeRule.Name,
      ...(nextToken !== undefined ? { NextToken: nextToken } : {}),
    });

    allTargetsOfEventBridgeRule.push(
      ...(listTargetsByRuleResult.Targets ?? []),
    );
    nextToken = listTargetsByRuleResult.NextToken;
  } while (nextToken !== undefined);

  return allTargetsOfEventBridgeRule;
};
