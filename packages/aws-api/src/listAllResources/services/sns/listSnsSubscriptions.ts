import { paginateListSubscriptions, Subscription } from '@aws-sdk/client-sns';

import { SnsSubscriptionARN } from '@sls-mentor/arn';

import { snsClient } from 'clients';

export const listSnsSubscriptions = async (): Promise<SnsSubscriptionARN[]> => {
  const snsSubscriptions: Subscription[] = [];

  try {
    for await (const resources of paginateListSubscriptions(
      { client: snsClient },
      {},
    )) {
      snsSubscriptions.push(...(resources.Subscriptions ?? []));
    }

    return snsSubscriptions
      .map(({ SubscriptionArn }) => SubscriptionArn)
      .filter(
        (SubscriptionArn): SubscriptionArn is string =>
          SubscriptionArn !== undefined &&
          SubscriptionArn !== 'PendingConfirmation',
      )
      .map(SnsSubscriptionARN.fromSubscriptionArn);
  } catch (e) {
    console.log('There was an issue while getting SnsSubscriptions: ', {
      e,
    });

    return [];
  }
};
