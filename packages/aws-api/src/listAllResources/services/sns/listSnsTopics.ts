import { paginateListTopics, Topic } from '@aws-sdk/client-sns';

import { SnsTopicARN } from '@sls-mentor/arn';

import { snsClient } from 'clients';

export const listSnsTopics = async (): Promise<SnsTopicARN[]> => {
  const snsTopics: Topic[] = [];

  try {
    for await (const resource of paginateListTopics(
      { client: snsClient },
      {},
    )) {
      snsTopics.push(...(resource.Topics ?? []));
    }

    return snsTopics
      .map(topic => topic.TopicArn)
      .filter((topic): topic is string => topic !== undefined)
      .map(SnsTopicARN.fromTopicArn);
  } catch (e) {
    console.log('There was an issue while getting SnsTopics: ', {
      e,
    });

    return [];
  }
};
