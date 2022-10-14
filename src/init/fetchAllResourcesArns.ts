import { ARN } from '@aws-sdk/util-arn-parser';
import intersectionWith from 'lodash/intersectionWith';
import { fetchCloudFormationResourceArns } from './fetchCloudFormationResourceArns';
import { fetchTaggedResourceArns } from './fetchTaggedResourceArns';

import { Tag } from '../types';

export const fetchAllResourceArns = async ({
  cloudformationStacks,
  tags,
}: {
  cloudformationStacks?: string[];
  tags?: Tag[];
}): Promise<ARN[]> => {
  const resourcesFetchedByTags = await fetchTaggedResourceArns(tags ?? []);

  if (cloudformationStacks === undefined) {
    return resourcesFetchedByTags;
  }

  const resourcesFetchedByStack = await fetchCloudFormationResourceArns(
    cloudformationStacks,
  );

  const resources = intersectionWith(
    resourcesFetchedByStack,
    resourcesFetchedByTags,
    (arnA, arnB) =>
      arnA.resource === arnB.resource && arnA.service === arnB.service,
  );

  return resources;
};
