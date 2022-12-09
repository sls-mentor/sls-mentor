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
} from '../rules';
import { Rule } from '../types';

export const MAX_GUARDIAN_LEVEL = 5;

export const rulesByLevel: Rule[][] = [
  // Level 1
  [UseArm, NoMonoPackage, ServerSideEncryptionEnabled],
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
