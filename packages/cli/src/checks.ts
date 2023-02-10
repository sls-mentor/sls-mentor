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
  NoDefaultMemory,
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
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import { ChecksResults } from './types';

const formatSpinnerString = (current: number, total: number): string =>
  chalk.green(`%s Processing rules ${current}/${total}...`);

export const runChecks = async (
  allResourceArns: CustomARN[],
  level: number,
  rulesConfigurations?: Record<string, RuleConfiguration>,
): Promise<ChecksResults> => {
  const allRules: Rule[] = [
    LightBundleRule,
    NoMonoPackage,
    NoDefaultMemory,
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

  const total = rulesToRunAccordingToLevel.length;
  let current = 1;

  const rulesSpinner = new Spinner({
    text: formatSpinnerString(current, total),
    stream: process.stderr,

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  rulesSpinner.setSpinnerString('⠇⠋⠙⠸⠴⠦');

  rulesSpinner.start();

  const decreaseRemaining = () => {
    if (current < total) {
      current++;
      rulesSpinner.setSpinnerTitle(formatSpinnerString(current, total));
    }
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

  rulesSpinner.stop(true);

  return results;
};
