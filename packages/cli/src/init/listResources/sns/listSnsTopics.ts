import { paginateListTopics, Topic } from '@aws-sdk/client-sns';
import { snsClient, SnsTopicARN } from '@sls-mentor/core';

export const listSnsTopics = async (): Promise<SnsTopicARN[]> => {
  const snsTopics: Topic[] = [];
  for await (const resource of paginateListTopics({ client: snsClient }, {})) {
    snsTopics.push(...(resource.Topics ?? []));
  }

  return snsTopics
    .map(topic => topic.TopicArn)
    .filter((topic): topic is string => topic !== undefined)
    .map(SnsTopicARN.fromArnString);
};
