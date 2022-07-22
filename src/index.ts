import { displayProgress } from './display';
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
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from './rules';
import { ChecksResults, Options, Rule, Tag } from './types';

const fetchResourceArns = async (
  cloudformation: string | undefined,
  tags: Tag[] | undefined,
) => {
  if (tags !== undefined) {
    return fetchTaggedResourceArns(tags);
  }

  if (cloudformation !== undefined) {
    return fetchCloudFormationResourceArns(cloudformation);
  }

  // Maybe replace with a check of all account on the specified region ?
  throw new Error('not enough argument specified');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const runGuardianChecks = async ({
  cloudformation,
  tags,
}: Options): Promise<ChecksResults> => {
  const resourceArns = await fetchResourceArns(cloudformation, tags);
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
  ];

  let remaining = rules.length + 1;

  const decreaseRemaining = () => {
    remaining -= 1;
    const rate = (rules.length - remaining) / rules.length;
    displayProgress(rate);
  };

  decreaseRemaining();

  return await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(resourceArns)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );
};
