import {
  GetSubscriptionAttributesCommand,
  GetSubscriptionAttributesCommandOutput,
} from '@aws-sdk/client-sns';

import { CustomARN, SnsSubscriptionARN } from '@sls-mentor/arn';

import { snsClient } from 'clients';

type SubscriptionAttributes = {
  arn: SnsSubscriptionARN;
  attributes: GetSubscriptionAttributesCommandOutput['Attributes'];
};

export const fetchSubscriptionAttributesByArn = async (
  arn: SnsSubscriptionARN,
): Promise<SubscriptionAttributes> => {
  const commandOutput = await snsClient.send(
    new GetSubscriptionAttributesCommand({ SubscriptionArn: arn.toString() }),
  );

  return {
    arn,
    attributes: commandOutput.Attributes,
  };
};

export const fetchAllSubscriptions = async (
  resourceArns: CustomARN[],
): Promise<SubscriptionAttributes[]> => {
  const subscriptions = CustomARN.filterArns(resourceArns, SnsSubscriptionARN);

  const AttributesByArn = await Promise.all(
    subscriptions.map(async arn => await fetchSubscriptionAttributesByArn(arn)),
  );

  return AttributesByArn;
};
