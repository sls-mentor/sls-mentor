import { MultiBar, Presets } from 'cli-progress';
import {
  AsyncSpecifyFailureDestination,
  AutoscaleRdsInstanceEnabled,
  CloudFrontSecurityHeaders,
  CognitoSignInCaseInsensitivity,
  CustomARN,
  DefinedBackupRetentionPeriodOrTransitionToColdStorage,
  DefinedLogsRetentionDuration,
  LightBundleRule,
  LimitedAmountOfLambdaVersions,
  noDefaultMemory,
  NoDeprecatedRuntime,
  NoMaxTimeout,
  NoMonoPackage,
  NoProvisionedConcurrency,
  NoSharedIamRoles,
  NoUnauthorizedApiGatewaysV2Routes,
  Rule,
  RuleConfiguration,
  S3OnlyAllowHTTPS,
  ServerSideEncryptionEnabled,
  SpecifyDlqOnEventBridgeRule,
  SpecifyDlqOnSqs,
  UnderMaxMemory,
  UseArm,
  UseIntelligentTiering,
} from '@sls-mentor/core';
import { ChecksResults } from './types';

export const runChecks = async (
  allResourceArns: CustomARN[],
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
    NoDeprecatedRuntime,
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
    CloudFrontSecurityHeaders,
    S3OnlyAllowHTTPS,
    NoProvisionedConcurrency,
    AutoscaleRdsInstanceEnabled,
    DefinedBackupRetentionPeriodOrTransitionToColdStorage,
    NoUnauthorizedApiGatewaysV2Routes,
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
      const ignoredArnPatterns =
        rulesConfigurations?.[rule.fileName]?.ignoredResources;

      const filteredResourcesArns = ignoredArnPatterns
        ? CustomARN.filterIgnoredArns(allResourceArns, ignoredArnPatterns)
        : allResourceArns;

      const ruleResult = (
        await rule.run(
          filteredResourcesArns,
          rulesConfigurations?.[rule.fileName],
        )
      ).results;
      decreaseRemaining();

      return { rule, result: ruleResult };
    }),
  );

  return results;
};
