import {
  paginateGetResources,
  ResourceGroupsTaggingAPIClient,
  ResourceTagMapping,
} from '@aws-sdk/client-resource-groups-tagging-api';
import { GuardianARN, Tag } from '../types';

export const fetchTaggedResourceArns = async (
  tags: Tag[],
): Promise<GuardianARN[]> => {
  const tagClient = new ResourceGroupsTaggingAPIClient({});

  const taggedResources: ResourceTagMapping[] = [];
  for await (const page of paginateGetResources(
    { client: tagClient },
    {
      TagFilters: tags.map(({ key, value }) => {
        return { Key: key, Values: [value] };
      }),
    },
  )) {
    taggedResources.push(...(page.ResourceTagMappingList ?? []));
  }

  return taggedResources
    .map(({ ResourceARN }) => ResourceARN)
    .filter((resourceArn): resourceArn is string => resourceArn !== undefined)
    .map(GuardianARN.fromArnString);
};
