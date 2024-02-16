import { CustomARN } from '@sls-mentor/arn';

import { listAllResourcesFromCloudformation } from './listAllResourcesFromCloudformation';
import { listAllResourcesFromServices } from './listAllResourcesFromServices';
import { listAllResourcesFromTags } from './listAllResourcesFromTags';

export const listAllResources = async ({
  cloudformationStacksToFilter,
  tags,
  region,
}: {
  cloudformationStacksToFilter?: string[];
  tags?: { key: string; value: string }[];
  region: string;
}): Promise<{ arn: CustomARN; stackName?: string }[]> => {
  const allResourcesFromServices = await listAllResourcesFromServices({
    region,
  });

  const resourcesToKeepByTags =
    tags === undefined || tags.length === 0
      ? allResourcesFromServices
      : await listAllResourcesFromTags(tags);

  const resourcesToKeepByStacks = await listAllResourcesFromCloudformation(
    cloudformationStacksToFilter ?? [],
  );

  const resourcesToKeep = resourcesToKeepByStacks.filter(resource =>
    resourcesToKeepByTags.some(a => a.is(resource.arn)),
  );

  return allResourcesFromServices
    .map(arn => {
      const stackName = resourcesToKeep.find(resource => resource.arn.is(arn))
        ?.stackName;

      return { arn, stackName };
    })
    .filter(
      resource =>
        resource.stackName !== undefined ||
        (cloudformationStacksToFilter ?? []).length === 0,
    );
};
