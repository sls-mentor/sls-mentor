import {
  ListTargetsByRuleCommand,
  ListTargetsByRuleCommandOutput,
  Rule,
  Target,
} from '@aws-sdk/client-eventbridge';
import { eventBridgeClient } from '../../clients';

export const getAllTargetsOfEventBridgeRule = async (
  eventBridgeRule: Rule,
): Promise<Target[]> => {
  const allTargetsOfEventBridgeRule: Target[] = [];

  let listTargetsByRuleResult: ListTargetsByRuleCommandOutput;
  let nextToken: string | undefined = undefined;

  do {
    listTargetsByRuleResult = await eventBridgeClient.send(
      new ListTargetsByRuleCommand({
        EventBusName: eventBridgeRule.EventBusName,
        Rule: eventBridgeRule.Name,
        ...(nextToken !== undefined ? { NextToken: nextToken } : {}),
      }),
    );

    allTargetsOfEventBridgeRule.push(
      ...(listTargetsByRuleResult.Targets ?? []),
    );
    nextToken = listTargetsByRuleResult.NextToken;
  } while (nextToken !== undefined);

  return allTargetsOfEventBridgeRule;
};
