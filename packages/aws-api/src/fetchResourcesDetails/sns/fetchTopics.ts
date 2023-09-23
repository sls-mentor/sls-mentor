import {
  GetTopicAttributesCommand,
  GetTopicAttributesCommandOutput,
} from '@aws-sdk/client-sns';

import { CustomARN, SnsTopicARN } from '@sls-mentor/arn';

import { snsClient } from 'clients';

type TopicAttributes = {
  arn: SnsTopicARN;
  attributes: GetTopicAttributesCommandOutput['Attributes'];
};
export const fetchTopicAttributesByArn = async (
  arn: SnsTopicARN,
): Promise<TopicAttributes> => {
  const commandOutput = await snsClient.send(
    new GetTopicAttributesCommand({ TopicArn: arn.toString() }),
  );

  return {
    arn,
    attributes: commandOutput.Attributes,
  };
};

export const fetchAllTopics = async (
  resourceArns: CustomARN[],
): Promise<TopicAttributes[]> => {
  const topics = CustomARN.filterArns(resourceArns, SnsTopicARN);

  const AttributesByArn = await Promise.all(
    topics.map(async arn => await fetchTopicAttributesByArn(arn)),
  );

  return AttributesByArn;
};
