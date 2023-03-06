import { CustomARN } from '@sls-mentor/core';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import intersectionWith from 'lodash/intersectionWith';
import { fetchCloudFormationResourceArns } from './fetchCloudFormationResourceArns';
import { fetchTaggedResourceArns } from './fetchTaggedResourceArns';

import { LILA_HEX } from '../constants';
import { Tag } from '../types';
import { listAllResources } from './listResources';

export const fetchAllResourceArns = async ({
  cloudformationStacks,
  tags,
}: {
  cloudformationStacks?: string[];
  tags?: Tag[];
}): Promise<CustomARN[]> => {
  const resourcesSpinner = new Spinner({
    text: chalk.hex(LILA_HEX)('%s Fetching resources...'),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  resourcesSpinner.setSpinnerString('⠇⠋⠙⠸⠴⠦');
  resourcesSpinner.start();

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

  resourcesSpinner.stop(true);

  return intersectionWith(
    allResources,
    resourcesToKeep,
    CustomARN.areARNsEqual,
  );
};
