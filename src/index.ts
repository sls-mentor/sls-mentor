import { ARN } from '@aws-sdk/util-arn-parser';
import {
  displayChecksStarting,
  displayDashboard,
  displayError,
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
import { ChecksResults, Options, Rule, RuleConfiguration } from './types';
import { readConfigurationFile } from './configuration';

export const runChecks = async (
  allResourceArns: ARN[],
): Promise<ChecksResults> => {
  const rules: Rule<RuleConfiguration>[] = [
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

  const config = readConfigurationFile(rules);
  console.log(config);

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
        const ruleResult = (await rule.run(allResourceArns)).results;
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

  let allReourcesArns: ARN[];
  try {
    allReourcesArns = await fetchAllResourceArns({
      cloudformationStacks:
        options.cloudformationStacks ?? options.cloudformations,
      tags: options.tags,
    });
  } catch {
    const profile = process.env.AWS_PROFILE;
    if (profile !== undefined) {
      displayError(
        `Unable to fetch AWS resources, check that profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
      );

      return { success: false };
    }

    displayError(
      `Unable to fetch AWS resources, check that your default profile is correctly set and has the needed rights or that you have correctly set environment variables`,
    );

    return { success: false };
  }

  const checksResults = await runChecks(allReourcesArns);

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
