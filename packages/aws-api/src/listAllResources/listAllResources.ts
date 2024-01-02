import { CustomARN } from '@sls-mentor/arn';

import { listAllResourcesFromCloudformation } from './listAllResourcesFromCloudformation';
import { listAllResourcesFromServices } from './listAllResourcesFromServices';
import { listAllResourcesFromTags } from './listAllResourcesFromTags';

export const listAllResources = async ({
  cloudformationStacks,
  tags,
  region,
}: {
  cloudformationStacks?: string[];
  tags?: { key: string; value: string }[];
  region: string;
}): Promise<CustomARN[]> => {
  const allResourcesFromServices = await listAllResourcesFromServices({
    region,
  });

  const resourcesToKeepByTags =
    tags === undefined || tags.length === 0
      ? allResourcesFromServices
      : await listAllResourcesFromTags(tags);

  const resourcesToKeepByStacks =
    cloudformationStacks === undefined || cloudformationStacks.length === 0
      ? allResourcesFromServices
      : await listAllResourcesFromCloudformation(cloudformationStacks);

  const resourcesToKeep = resourcesToKeepByTags.filter(arn =>
    resourcesToKeepByStacks.some(a => a.is(arn)),
  );

  return allResourcesFromServices.filter(arn =>
    resourcesToKeep.some(a => a.is(arn)),
  );
};
