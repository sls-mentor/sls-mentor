import {
  PassingResourcesByCategory,
  PassingResourcesByRule,
} from '@sls-mentor/core';

export const mockResults: {
  passingResourcesByRule: PassingResourcesByRule;
  passingResourcesByCategory: PassingResourcesByCategory;
} = {
  passingResourcesByRule: {
    lightBundle: {
      passingResources: [
        {
          ruleName: 'lightBundle',
          arn: 'arn1',
        },
      ],
      totalResources: [
        {
          ruleName: 'lightBundle',
          arn: 'arn1',
        },
        {
          ruleName: 'lightBundle',
          arn: 'arn2',
        },
      ],
      passingResourcesAmount: 1,
      totalResourcesAmount: 2,
    },
    enableBlockPublicAccess: {
      passingResources: [
        {
          ruleName: 'enableBlockPublicAccess',
          arn: 'arn1',
        },
      ],
      totalResources: [
        {
          ruleName: 'enableBlockPublicAccess',
          arn: 'arn1',
        },
        {
          ruleName: 'enableBlockPublicAccess',
          arn: 'arn2',
        },
      ],
      passingResourcesAmount: 1,
      totalResourcesAmount: 2,
    },
    s3OnlyAllowHTTPS: {
      passingResources: [
        {
          ruleName: 's3OnlyAllowHTTPS',
          arn: 'arn1',
        },
      ],
      totalResources: [
        {
          ruleName: 's3OnlyAllowHTTPS',
          arn: 'arn1',
        },
        {
          ruleName: 's3OnlyAllowHTTPS',
          arn: 'arn2',
        },
      ],
      passingResourcesAmount: 1,
      totalResourcesAmount: 2,
    },
    useArm: {
      passingResources: [
        {
          ruleName: 'useArm',
          arn: 'arn1',
        },
      ],
      totalResources: [
        {
          ruleName: 'useArm',
          arn: 'arn1',
        },
        {
          ruleName: 'useArm',
          arn: 'arn2',
        },
      ],
      passingResourcesAmount: 1,
      totalResourcesAmount: 2,
    },
  },
  passingResourcesByCategory: {
    GreenIT: {
      passingResources: [
        {
          arn: 'arn1',
          ruleName: 'lightBundle',
        },
      ],
      totalResources: [
        {
          arn: 'arn1',
          ruleName: 'lightBundle',
        },
        {
          arn: 'arn2',
          ruleName: 'lightBundle',
        },
      ],
      passingResourcesAmount: 1,
      totalResourcesAmount: 2,
    },
    Security: {
      passingResources: [
        {
          arn: 'arn1',
          ruleName: 'enableBlockPublicAccess',
        },
        {
          arn: 'arn1',
          ruleName: 's3OnlyAllowHTTPS',
        },
        {
          arn: 'arn1',
          ruleName: 'useArm',
        },
      ],
      totalResources: [
        {
          arn: 'arn1',
          ruleName: 'enableBlockPublicAccess',
        },
        {
          arn: 'arn1',
          ruleName: 's3OnlyAllowHTTPS',
        },
        {
          arn: 'arn1',
          ruleName: 'useArm',
        },
        {
          arn: 'arn2',
          ruleName: 'enableBlockPublicAccess',
        },
        {
          arn: 'arn2',
          ruleName: 's3OnlyAllowHTTPS',
        },
        {
          arn: 'arn2',
          ruleName: 'useArm',
        },
      ],
      passingResourcesAmount: 3,
      totalResourcesAmount: 6,
    },
    Speed: {
      passingResources: [],
      totalResources: [],
      passingResourcesAmount: 0,
      totalResourcesAmount: 0,
    },
    Stability: {
      passingResources: [],
      totalResources: [],
      passingResourcesAmount: 0,
      totalResourcesAmount: 0,
    },
    ITCosts: {
      passingResources: [],
      totalResources: [],
      passingResourcesAmount: 0,
      totalResourcesAmount: 0,
    },
  },
};
