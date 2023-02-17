import { CATEGORIES, categoryNames, rules } from '@sls-mentor/core';
import fs from 'fs';
import groupBy from 'lodash/groupBy';
import path from 'path';

const rulesByLevelDictionnary = groupBy(rules, 'level');
export const rulesByLevel = Object.keys(rulesByLevelDictionnary).map(level => ({
  type: 'category',
  label: `Level ${level}`,
  items: rulesByLevelDictionnary[level].map(
    ({ fileName }) => `rules/${fileName}`,
  ),
}));

const rulesByCategoryDictionnary = Object.fromEntries(
  CATEGORIES.map(category => [
    category,
    rules.filter(rule => rule.categories.includes(category)),
  ]),
);
export const rulesByCategory = CATEGORIES.map(category => ({
  type: 'category',
  label: categoryNames[category],
  items: rulesByCategoryDictionnary[category].map(
    ({ fileName }) => `rules/${fileName}`,
  ),
}));

const rulesByService = [
  {
    type: 'category',
    label: 'Lambda',
    items: [
      'rules/useArm',
      'rules/lightBundle',
      'rules/asyncSpecifyFailureDestination',
      'rules/noDefaultMemory',
      'rules/noMaxTimeout',
      'rules/noMonoPackage',
      'rules/noProvisionedConcurrency',
      'rules/noSharedIamRoles',
      'rules/underMaxMemory',
      'rules/limitedAmountOfVersions',
      'rules/noDeprecatedRuntime',
    ],
  },
  {
    type: 'category',
    label: 'S3',
    items: [
      'rules/s3OnlyAllowHTTPS',
      'rules/serverSideEncryptionEnabled',
      'rules/useIntelligentTiering',
    ],
  },
  {
    type: 'category',
    label: 'CloudWatch',
    items: ['rules/definedLogsRetentionDuration'],
  },
  {
    type: 'category',
    label: 'CloudFront',
    items: ['rules/cloudFrontSecurityHeaders'],
  },
  {
    type: 'category',
    label: 'Cognito',
    items: ['rules/cognitoSignInCaseInsensitivity'],
  },
  {
    type: 'category',
    label: 'SQS',
    items: ['rules/specifyDlqOnSqs'],
  },
  {
    type: 'category',
    label: 'EventBridge',
    items: ['rules/specifyDlqOnEventBridgeRule'],
  },
  {
    type: 'category',
    label: 'RDS',
    items: ['rules/autoscaleRdsInstanceEnabled'],
  },
  {
    type: 'category',
    label: 'Backup',
    items: ['rules/definedBackupRetentionPeriodOrTransitionToColdStorage'],
  },
  {
    type: 'category',
    label: 'Api Gateway V2',
    items: ['rules/noUnauthorizedApiGatewaysV2Routes'],
  },
];

const sidebars = {
  docsSidebar: [
    {
      label: 'Intro',
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'category',
      label: 'Set up sls-mentor',
      items: [
        'set-up-sls-mentor/run-locally',
        'set-up-sls-mentor/run-in-ci',
        'set-up-sls-mentor/configure-sls-mentor',
      ],
    },
    {
      type: 'category',
      label: 'Rules',
      items: [
        {
          type: 'category',
          label: 'By service',
          items: rulesByService,
        },
        {
          type: 'category',
          label: 'By category',
          items: rulesByCategory,
        },
        {
          type: 'category',
          label: 'By level',
          items: rulesByLevel,
        },
      ],
    },
  ],
};

fs.writeFileSync(
  path.join(__dirname, '../sidebars.json'),
  JSON.stringify(sidebars),
);
