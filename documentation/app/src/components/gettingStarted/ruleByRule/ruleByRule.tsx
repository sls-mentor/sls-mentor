import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ruleByRule.module.css';

const rulesByService = {
  s3: {
    icon: 's3.svg',
    name: 'S3 buckets',
    rules: [
      { name: 'Use Intelligent Tiering', id: 'useIntelligentTiering' },
      { name: 'Only allow HTTPS', id: 's3OnlyAllowHTTPS' },
      {
        name: 'Server-side encryption enabled',
        id: 'serverSideEncryptionEnabled',
      },
    ],
  },
  lambda: {
    icon: 'lambda.svg',
    name: 'Lambda functions',
    rules: [
      {
        name: 'Async - Specify failure destination',
        id: 'asyncSpecifyFailureDestination',
      },
      { name: 'Light bundle', id: 'lightBundle' },
      {
        name: 'Limited amount of versions',
        id: 'limitedAmountOfVersions',
      },
      {
        name: 'No default memory',
        id: 'noDefaultMemory',
      },
      {
        name: 'No max timeout',
        id: 'noMaxTimeout',
      },
      {
        name: 'No mono package',
        id: 'noMonoPackage',
      },
      {
        name: 'No shared Iam roles',
        id: 'noSharedIamRoles',
      },
      {
        name: 'No provisioned concurrency',
        id: 'noProvisionedConcurrency',
      },
      {
        name: 'Under max memory',
        id: 'underMaxMemory',
      },
      {
        name: 'Use ARM',
        id: 'useArm',
      },
    ],
  },
  eventBridge: {
    icon: 'eventBridge.svg',
    name: 'EventBridge rules',
    rules: [
      {
        name: 'Specify DLQ on EventBridge rule',
        id: 'specifyDlqOnEventBridgeRule',
      },
    ],
  },
  sqs: {
    icon: 'sqs.svg',
    name: 'SQS queues',
    rules: [
      {
        name: 'Specify DLQ on SQS rules',
        id: 'specifyDlqOnSqs',
      },
    ],
  },
  cloudwatch: {
    icon: 'cloudWatch.svg',
    name: 'CloudWatch log groups',
    rules: [
      {
        name: 'Define log retention duration',
        id: 'definedLogsRetentionDuration',
      },
    ],
  },
  cognito: {
    icon: 'cognito.svg',
    name: 'Cognito user pools',
    rules: [
      {
        name: 'Enable sign-in case insensitivity',
        id: 'cognitoSignInCaseInsensitivity',
      },
    ],
  },
  rds: {
    icon: 'rds.svg',
    name: 'RDS instances',
    rules: [
      {
        name: 'Enable autoscaling on instances',
        id: 'autoscaleRdsInstanceEnabled',
      },
    ],
  },
  cloudfront: {
    icon: 'cloudfront.svg',
    name: 'Cloudfront distributions',
    rules: [
      {
        name: 'Add security headers',
        id: 'cloudFrontSecurityHeaders',
      },
    ],
  },
};

console.log(rulesByService);

export const RuleByRule = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h6>Main dashboard</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>
          {Object.values(rulesByService).map(({ icon }) => (
            <img src={useBaseUrl(`img/services/${icon}`)} key={icon} />
          ))}
        </div>
        <div className={styles.innerCard}>
          <p>Test 2</p>
        </div>
      </div>
    </div>
  );
};
