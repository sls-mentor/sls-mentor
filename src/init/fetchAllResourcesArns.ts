import { ARN } from '@aws-sdk/util-arn-parser';
import intersectionWith from 'lodash/intersectionWith';
import { fetchCloudFormationResourceArns } from './fetchCloudFormationResourceArns';
import { fetchTaggedResourceArns } from './fetchTaggedResourceArns';

import { GuardianARN, Tag } from '../types';
import { listAllResources } from './listResources';

export const fetchAllResourceArns = async ({
  cloudformationStacks,
  tags,
}: {
  cloudformationStacks?: string[];
  tags?: Tag[];
}): Promise<ARN[]> => {
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
    GuardianARN.areARNsEqual,
  );

  return intersectionWith(
    allResources,
    resourcesToKeep,
    GuardianARN.areARNsEqual,
  );
};
