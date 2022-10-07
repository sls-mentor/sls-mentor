import intersectionWith from 'lodash/intersectionWith';
import Progress from 'cli-progress';
import { TooManyRequestsException } from '@aws-sdk/client-lambda';
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
import { displayError } from './display';

const fetchResourceArns = async (
  cloudformations: string[] | undefined,
  tags: Tag[] | undefined,
) => {
  try {
    if (cloudformations === undefined) {
      return await fetchTaggedResourceArns(tags ?? []);
    }

    const resourcesFetchedByStack = await fetchCloudFormationResourceArns(
      cloudformations,
    );

    if (tags === undefined) {
      return resourcesFetchedByStack;
    }

    const resourcesFetchedByTags = await fetchTaggedResourceArns(tags);

    return intersectionWith(
      resourcesFetchedByStack,
      resourcesFetchedByTags,
      (arnA, arnB) =>
        arnA.resource === arnB.resource && arnA.service === arnB.service,
    );
  } catch (error) {
    console.log(error);
    displayError(
      `Unable to fetch AWS resources, check that profile "${
        process.env.AWS_PROFILE ?? ''
      }" is correctly set or specify another profile using -p option`,
    );
    process.exit(1);
  }
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
    if (error instanceof TooManyRequestsException) {
      displayError(
        'Too many requests sent to AWS, try to reduce the scope of your analysis by specifying filters on your cloudformation stacks (-c), or resource tags (-t).',
      );
    }
    process.exit(1);
  }
};
