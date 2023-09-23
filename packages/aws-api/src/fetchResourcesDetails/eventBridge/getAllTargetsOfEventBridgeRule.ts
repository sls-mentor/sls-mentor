import {
  ListTargetsByRuleCommand,
  Rule,
  Target,
} from '@aws-sdk/client-eventbridge';

import { eventBridgeClient } from 'clients';

export const getAllTargetsOfEventBridgeRule = async (
  eventBridgeRule: Rule,
): Promise<Target[]> => {
  const allTargetsOfEventBridgeRule: Target[] = [];

  let nextToken: string | undefined;

  do {
    const { Targets, NextToken } = await eventBridgeClient.send(
      new ListTargetsByRuleCommand({
        EventBusName: eventBridgeRule.EventBusName,
        Rule: eventBridgeRule.Name,
        NextToken: nextToken,
      }),
    );

    allTargetsOfEventBridgeRule.push(...(Targets ?? []));
    nextToken = NextToken;
  } while (nextToken !== undefined);

  return allTargetsOfEventBridgeRule;
};
