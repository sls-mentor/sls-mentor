import intersectionWith from 'lodash/intersectionWith';
import { fetchCloudFormationResourceArns } from './fetchCloudFormationResourceArns';
import { fetchTaggedResourceArns } from './fetchTaggedResourceArns';

import { CustomARN, Tag } from '../types';
import { listAllResources } from './listResources';

export const fetchAllResourceArns = async ({
  cloudformationStacks,
  tags,
}: {
  cloudformationStacks?: string[];
  tags?: Tag[];
}): Promise<CustomARN[]> => {
  const allResources = await listAllResources();

  const resourcesToKeepByTags =
    tags === undefined || tags.length === 0
      ? allResources
      : await fetchTaggedResourceArns(tags);

  const resourcesToKeepByStacks =
    cloudformationStacks === undefined || cloudformationStacks.length === 0
      ? allResources
      : await fetchCloudFormationResourceArns(cloudformationStacks);

  const resourcesToKeep = intersectionWith(
    resourcesToKeepByTags,
    resourcesToKeepByStacks,
    CustomARN.areARNsEqual,
  );

  return intersectionWith(
    allResources,
    resourcesToKeep,
    CustomARN.areARNsEqual,
  );
};
