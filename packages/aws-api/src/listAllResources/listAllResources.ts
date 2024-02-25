import { CustomARN } from '@sls-mentor/arn';

import { listAllResourcesFromCloudformation } from './listAllResourcesFromCloudformation';
import { listAllResourcesFromServices } from './listAllResourcesFromServices';
import { listAllResourcesFromTags } from './listAllResourcesFromTags';

export const listAllResources = async ({
  cloudformationStacksToFilter,
  tagsToFilter,
  region,
}: {
  cloudformationStacksToFilter?: string[];
  tagsToFilter?: { Key?: string; Value?: string }[];
  region: string;
}): Promise<
  {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[]
> => {
  const allResourcesFromServices = await listAllResourcesFromServices({
    region,
  });

  const resourcesToKeepByTags = await listAllResourcesFromTags(
    tagsToFilter ?? [],
  );

  const resourcesToKeepByStacks = await listAllResourcesFromCloudformation(
    cloudformationStacksToFilter ?? [],
  );

  const allResourcesWithTagsAndStackNames = allResourcesFromServices.map(
    allResourcesArn => {
      return {
        arn: allResourcesArn,
        cloudformationStack: resourcesToKeepByStacks.find(resource =>
          resource.arn.is(allResourcesArn),
        )?.cloudformationStack,
        tags:
          resourcesToKeepByTags.find(resource =>
            resource.arn.is(allResourcesArn),
          )?.tags ?? [],
      };
    },
  );

  return allResourcesWithTagsAndStackNames
    .filter(
      resource =>
        resource.cloudformationStack !== undefined ||
        (cloudformationStacksToFilter ?? []).length === 0,
    )
    .filter(
      resource =>
        (tagsToFilter ?? []).length === 0 ||
        tagsToFilter?.some(tag =>
          resource.tags.some(
            resourceTag =>
              resourceTag.Key === tag.Key && resourceTag.Value === tag.Value,
          ),
        ),
    )
    .map(resource => {
      return {
        arn: resource.arn,
        cloudformationStack: resource.cloudformationStack,
        tags: resource.tags.reduce(
          (acc, tag) => ({ ...acc, [tag.Key ?? '']: tag.Value }),
          {},
        ),
      };
    });
};
