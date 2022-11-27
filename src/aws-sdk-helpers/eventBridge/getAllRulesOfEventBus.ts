import {
  ListRulesCommand,
  ListRulesCommandOutput,
  Rule,
} from '@aws-sdk/client-eventbridge';
import { ARN, build } from '@aws-sdk/util-arn-parser';
import { eventBridgeClient } from '../../clients';
export const getAllRulesOfEventBus = async (eventBus: ARN): Promise<Rule[]> => {
  const eventBusArn = build(eventBus);

  const allEventBusRules: Rule[] = [];

  let listRulesResult: ListRulesCommandOutput;
  let nextToken: string | undefined = undefined;

  do {
    listRulesResult = await eventBridgeClient.send(
      new ListRulesCommand({
        EventBusName: eventBusArn,
        ...(nextToken !== undefined ? { NextToken: nextToken } : {}),
      }),
    );

    allEventBusRules.push(...(listRulesResult.Rules ?? []));
    nextToken = listRulesResult.NextToken;
  } while (nextToken !== undefined);

  return allEventBusRules;
};
