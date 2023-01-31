/* eslint-disable max-lines */
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
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
          items: [
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
              items: [
                'rules/definedBackupRetentionPeriodOrTransitionToColdStorage',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'By category',
          items: [
            {
              type: 'category',
              label: 'Green IT',
              items: [
                'rules/useArm',
                'rules/definedLogsRetentionDuration',
                'rules/lightBundle',
                'rules/limitedAmountOfVersions',
                'rules/noDefaultMemory',
                'rules/noMaxTimeout',
                'rules/noProvisionedConcurrency',
                'rules/underMaxMemory',
                'rules/useIntelligentTiering',
                'rules/definedBackupRetentionPeriodOrTransitionToColdStorage',
              ],
            },
            {
              type: 'category',
              label: 'Stability',
              items: [
                'rules/asyncSpecifyFailureDestination',
                'rules/autoscaleRdsInstanceEnabled',
                'rules/cognitoSignInCaseInsensitivity',
                'rules/lightBundle',
                'rules/limitedAmountOfVersions',
                'rules/noMaxTimeout',
                'rules/noMonoPackage',
                'rules/noSharedIamRoles',
                'rules/specifyDlqOnEventBridgeRule',
                'rules/specifyDlqOnSqs',
                'rules/noDeprecatedRuntime',
              ],
            },
            {
              type: 'category',
              label: 'Security',
              items: [
                'rules/cloudFrontSecurityHeaders',
                'rules/noSharedIamRoles',
                'rules/s3OnlyAllowHTTPS',
                'rules/serverSideEncryptionEnabled',
                'rules/noDeprecatedRuntime',
              ],
            },
            {
              type: 'category',
              label: 'IT Costs',
              items: [
                'rules/definedLogsRetentionDuration',
                'rules/noDefaultMemory',
                'rules/noMaxTimeout',
                'rules/noProvisionedConcurrency',
                'rules/underMaxMemory',
                'rules/useArm',
                'rules/useIntelligentTiering',
                'rules/definedBackupRetentionPeriodOrTransitionToColdStorage',
              ],
            },
            {
              type: 'category',
              label: 'Speed',
              items: ['rules/useArm'],
            },
          ],
        },
        {
          type: 'category',
          label: 'By level',
          items: [
            {
              type: 'category',
              label: 'Level 1',
              items: [
                'rules/useArm',
                'rules/noMonoPackage',
                'rules/serverSideEncryptionEnabled',
                'rules/cloudFrontSecurityHeaders',
              ],
            },
            {
              type: 'category',
              label: 'Level 2',
              items: [
                'rules/s3OnlyAllowHTTPS',
                'rules/underMaxMemory',
                'rules/useIntelligentTiering',
                'rules/limitedAmountOfVersions',
              ],
            },
            {
              type: 'category',
              label: 'Level 3',
              items: [
                'rules/noDefaultMemory',
                'rules/noMaxTimeout',
                'rules/definedLogsRetentionDuration',
                'rules/autoscaleRdsInstanceEnabled',
                'rules/noProvisionedConcurrency',
                'rules/definedBackupRetentionPeriodOrTransitionToColdStorage',
              ],
            },
            {
              type: 'category',
              label: 'Level 4',
              items: [
                'rules/specifyDlqOnSqs',
                'rules/noSharedIamRoles',
                'rules/lightBundle',
                'rules/noDeprecatedRuntime',
              ],
            },
            {
              type: 'category',
              label: 'Level 5',
              items: [
                'rules/cognitoSignInCaseInsensitivity',
                'rules/specifyDlqOnEventBridgeRule',
                'rules/asyncSpecifyFailureDestination',
              ],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
