import { MultiBar, Presets } from 'cli-progress';
import {
  AsyncSpecifyFailureDestination,
  CognitoSignInCaseInsensitivity,
  DefinedLogsRetentionDuration,
  LightBundleRule,
  LimitedAmountOfLambdaVersions,
  noDefaultMemory,
  NoMaxTimeout,
  NoMonoPackage,
  NoSharedIamRoles,
  ServerSideEncryptionEnabled,
  SpecifyDlqOnEventBridgeRule,
  SpecifyDlqOnSqs,
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from './rules';
import { ChecksResults, GuardianARN, Rule, RuleConfiguration } from './types';

export const runChecks = async (
  allResourceArns: GuardianARN[],
  level: number,
  rulesConfigurations?: Record<string, RuleConfiguration>,
): Promise<ChecksResults> => {
  const progressBar = new MultiBar(
    { emptyOnZero: true, hideCursor: true },
    Presets.rect,
  );
  process.on('SIGINT', () => {
    progressBar.stop();
    process.exit(0);
  });

  const allRules: Rule[] = [
    LightBundleRule,
    NoMonoPackage,
    noDefaultMemory,
    NoMaxTimeout,
    NoSharedIamRoles,
    UseArm,
    LimitedAmountOfLambdaVersions,
    UnderMaxMemory,
    AsyncSpecifyFailureDestination,
    UseIntelligentTiering,
    ServerSideEncryptionEnabled,
    SpecifyDlqOnSqs,
    CognitoSignInCaseInsensitivity,
    DefinedLogsRetentionDuration,
    SpecifyDlqOnEventBridgeRule,
  ];

  const rulesToRunAccordingToLevel = allRules.filter(
    rule => rule.level <= level,
  );

  const total = rulesToRunAccordingToLevel.length + 1;

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
    rulesToRunAccordingToLevel.map(async rule => {
      const ruleResult = (
        await rule.run(allResourceArns, rulesConfigurations?.[rule.fileName])
      ).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  return results;
};
