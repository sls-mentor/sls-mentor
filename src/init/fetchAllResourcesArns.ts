import { ARN } from '@aws-sdk/util-arn-parser';
import intersectionWith from 'lodash/intersectionWith';
import { fetchCloudFormationResourceArns } from './fetchCloudFormationResourceArns';
import { fetchTaggedResourceArns } from './fetchTaggedResourceArns';

import { displayError } from '../display';
import { Tag } from '../types';

export const fetchAllResourceArns = async (
  cloudformationStacks: string[] | undefined,
  tags: Tag[] | undefined,
): Promise<ARN[]> => {
  try {
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
  } catch {
    const profile = process.env.AWS_PROFILE;
    if (profile !== undefined) {
      displayError(
        `Unable to fetch AWS resources, check that profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
      );
      process.exit(1);
    }

    displayError(
      `Unable to fetch AWS resources, check that your default profile is correctly set and has the needed rights or that you have correctly set environment variables`,
    );
    process.exit(1);
  }
};
