import intersectionWith from 'lodash/intersectionWith';
import Progress from 'cli-progress';
import {
  fetchCloudFormationResourceArns,
  fetchTaggedResourceArns,
} from './helpers';
import {
  AsyncSpecifyFailureDestination,
  LightBundleRule,
  LimitedAmountOfLambdaVersions,
  noDefaultMemory,
  NoIdenticalCode,
  NoMaxTimeout,
  NoSharedIamRoles,
  SpecifyDlqOnSqs,
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from './rules';
import { ChecksResults, Options, Rule, Tag } from './types';

const fetchResourceArns = async (
  cloudformations: string[] | undefined,
  tags: Tag[] | undefined,
) => {
  const resourcesFetchedByTags = await fetchTaggedResourceArns(tags ?? []);

  if (cloudformations === undefined) {
    return resourcesFetchedByTags;
  }

  const resourcesFetchedByStack = await fetchCloudFormationResourceArns(
    cloudformations,
  );

  const resources = intersectionWith(
    resourcesFetchedByStack,
    resourcesFetchedByTags,
    (arnA, arnB) =>
      arnA.resource === arnB.resource && arnA.service === arnB.service,
  );

  return resources;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const runGuardianChecks = async ({
  cloudformations,
  tags,
}: Options): Promise<ChecksResults> => {
  const resourceArns = await fetchResourceArns(cloudformations, tags);
  const rules: Rule[] = [
    LightBundleRule,
    NoIdenticalCode,
    noDefaultMemory,
    NoMaxTimeout,
    NoSharedIamRoles,
    UseArm,
    UseIntelligentTiering,
    LimitedAmountOfLambdaVersions,
    UnderMaxMemory,
    AsyncSpecifyFailureDestination,
    SpecifyDlqOnSqs,
  ];

  const total = rules.length + 1;

  const progressBar = new Progress.SingleBar({}, Progress.Presets.rect);
  progressBar.start(total, 0);

  const decreaseRemaining = () => {
    progressBar.increment();
  };

  decreaseRemaining();

  const results = await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(resourceArns)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  progressBar.stop();

  return results;
};
