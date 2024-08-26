import { EventBus, ListEventBusesCommand } from '@aws-sdk/client-eventbridge';

import { EventBridgeEventBusARN } from '@sls-mentor/arn';

import { eventBridgeClient } from 'clients';

export const listEventBridgeEventBuses = async (): Promise<
  EventBridgeEventBusARN[]
> => {
  const eventBuses: EventBus[] = [];
  try {
    let nextToken: string | undefined;

    do {
      const resources = await eventBridgeClient.send(
        new ListEventBusesCommand({ NextToken: nextToken }),
      );

      eventBuses.push(...(resources.EventBuses ?? []));
      nextToken = resources.NextToken;
    } while (nextToken !== undefined);

    return eventBuses
      .map(({ Name }) => Name)
      .filter(
        (eventBusName): eventBusName is string => eventBusName !== undefined,
      )
      .map(EventBridgeEventBusARN.fromEventBusName);
  } catch (e) {
    console.log('There was an issue while getting EventBridgeEventBuses: ', {
      e,
    });

    return [];
  }
};
