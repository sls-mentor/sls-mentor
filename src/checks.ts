import { progressBar } from './display';
import {
  AsyncSpecifyFailureDestination,
  CognitoSignInCaseInsensitivity,
  DefinedLogsRetentionDuration,
  LightBundleRule,
  LimitedAmountOfLambdaVersions,
  noDefaultMemory,
  NoIdenticalCode,
  NoMaxTimeout,
  NoSharedIamRoles,
  ServerSideEncryptionEnabled,
  SpecifyDlqOnEventBridgeRule,
  SpecifyDlqOnSqs,
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from './rules';
import { ChecksResults, GuardianARN, Rule } from './types';

export const runChecks = async (
  allResourceArns: GuardianARN[],
  level: number,
): Promise<ChecksResults> => {
  const rulesByLevel: Rule[][] = [
    // Level 1
    [UseArm, NoIdenticalCode, ServerSideEncryptionEnabled],
    // Level 2
    [LimitedAmountOfLambdaVersions, UnderMaxMemory, UseIntelligentTiering],
    // Level 3
    [noDefaultMemory, NoMaxTimeout, DefinedLogsRetentionDuration],
    // Level 4
    [NoSharedIamRoles, LightBundleRule, SpecifyDlqOnSqs],
    // Level 5
    [
      AsyncSpecifyFailureDestination,
      CognitoSignInCaseInsensitivity,
      SpecifyDlqOnEventBridgeRule,
    ],
  ];
  const rules = rulesByLevel.slice(0, level).flat();

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
