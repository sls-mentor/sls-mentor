import intersectionWith from 'lodash/intersectionWith';
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
import { displayError, progressBar } from './display';

const fetchResourceArns = async (
  cloudformationStacks: string[] | undefined,
  tags: Tag[] | undefined,
) => {
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

export const runGuardianChecks = async ({
  cloudformations,
  cloudformationStacks,
  tags,
}: Options): Promise<ChecksResults> => {
  const resourceArns = await fetchResourceArns(
    cloudformationStacks ?? cloudformations,
    tags,
  );
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

  const rulesProgressBar = progressBar.create(
    total,
    0,
    {},
    { format: 'Rules:  {bar} {percentage}% | ETA: {eta}s | {value}/{total}' },
  );

  const decreaseRemaining = () => {
    rulesProgressBar.increment();
  };

  decreaseRemaining();

  try {
    const results = await Promise.all(
      rules.map(async rule => {
        const ruleResult = (await rule.run(resourceArns)).results;
        decreaseRemaining();

        return { rule, result: ruleResult };
      }),
    );
    progressBar.stop();

    return results;
  } catch (error) {
    progressBar.stop();
    throw error;
  }
};
