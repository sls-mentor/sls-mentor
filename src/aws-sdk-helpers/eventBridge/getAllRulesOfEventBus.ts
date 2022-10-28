import { ARN, build } from '@aws-sdk/util-arn-parser';
import {
  EventBridge,
  ListRulesCommandOutput,
  Rule,
} from '@aws-sdk/client-eventbridge';
export const getAllRulesOfEventBus = async (
  eventBus: ARN,
  eventBridgeClient: EventBridge,
): Promise<Rule[]> => {
  const eventBusArn = build(eventBus);

  const allEventBusRules: Rule[] = [];

  let listRulesResult: ListRulesCommandOutput;
  let nextToken: string | undefined = undefined;

  do {
    listRulesResult = await eventBridgeClient.listRules({
      EventBusName: eventBusArn,
      ...(nextToken !== undefined ? { NextToken: nextToken } : {}),
    });

    allEventBusRules.push(...(listRulesResult.Rules ?? []));
    nextToken = listRulesResult.NextToken;
  } while (nextToken !== undefined);

  return allEventBusRules;
};
