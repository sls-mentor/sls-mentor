import { ARN } from '@aws-sdk/util-arn-parser';
import { progressBar } from './display';
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
import { ChecksResults } from './types/CheckResult';
import { Rule } from './types/Rule';

export const runChecks = async (
  allResourceArns: ARN[],
): Promise<ChecksResults> => {
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

  const results = await Promise.all(
    rules.map(async rule => {
      const ruleResult = (await rule.run(allResourceArns)).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  return results;
};
