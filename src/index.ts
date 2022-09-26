import intersectionWith from 'lodash/intersectionWith';
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
import { displayError, progressBar } from './display';

const fetchResourceArns = async (
  cloudformations: string[] | undefined,
  tags: Tag[] | undefined,
) => {
  try {
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
  } catch {
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
    if (error instanceof TooManyRequestsException) {
      displayError(
        'Too many requests sent to AWS, try to reduce the scope of your analysis by specifying filters on your cloudformation stacks (-c), or resource tags (-t).',
      );
    }
    process.exit(1);
  }
};
