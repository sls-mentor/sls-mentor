import { ListRulesCommand, Rule } from '@aws-sdk/client-eventbridge';

import { EventBridgeEventBusARN } from '@sls-mentor/arn';

import { eventBridgeClient } from 'clients';

export const getAllRulesOfEventBus = async (
  eventBus: EventBridgeEventBusARN,
): Promise<Rule[]> => {
  const allEventBusRules: Rule[] = [];

  let nextToken: string | undefined;

  do {
    const { Rules, NextToken } = await eventBridgeClient.send(
      new ListRulesCommand({
        EventBusName: eventBus.getEventBusName(),
        NextToken: nextToken,
      }),
    );

    allEventBusRules.push(...(Rules ?? []).filter(isStandardRule));
    nextToken = NextToken;
  } while (nextToken !== undefined);

  return allEventBusRules;
};

const isStandardRule = (event: Rule): boolean => {
  return event.ManagedBy === undefined;
};
