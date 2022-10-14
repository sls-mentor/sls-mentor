import {
  displayChecksStarting,
  displayDashboard,
  displayFailedChecksDetails,
  displayGuordle,
  displayResultsSummary,
  progressBar,
} from './display';
import { fetchAllResourceArns } from './init';
import { getResultsByCategory } from './results/getResultsByCategory';
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
import { ChecksResults, Options, Rule } from './types';

export const runChecks = async ({
  cloudformations,
  cloudformationStacks,
  tags,
}: Options): Promise<ChecksResults> => {
  const resourceArns = await fetchAllResourceArns(
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

export const runGuardian = async (
  options: Options,
): Promise<{ success: boolean }> => {
  displayChecksStarting();
  const checksResults = await runChecks(options);

  const atLeastOneFailed = checksResults.some(
    ({ result }) => result.filter(resource => !resource.success).length > 0,
  );

  if (!options.short && atLeastOneFailed) {
    displayFailedChecksDetails(checksResults);
  }

  displayResultsSummary(checksResults);
  const resultsByCategory = getResultsByCategory(checksResults);
  displayDashboard(resultsByCategory);
  displayGuordle(resultsByCategory);

  return { success: options.noFail || !atLeastOneFailed };
};
