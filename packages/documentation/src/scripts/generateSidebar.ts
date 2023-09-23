import fs from 'fs';
import groupBy from 'lodash/groupBy';
import path from 'path';

import {
  allRules,
  CATEGORIES,
  categoryNames,
  Service,
  SERVICES,
  SLS_MENTOR_LEVELS,
} from '@sls-mentor/rules';

const serviceNames: Record<Service, string> = {
  Lambda: 'Lambda',
  S3: 'S3',
  CloudWatch: 'CloudWatch',
  CloudFront: 'CloudFront',
  Cognito: 'Cognito',
  DynamoDB: 'DynamoDB',
  SNS: 'SNS',
  SQS: 'SQS',
  EventBridge: 'EventBridge',
  RDS: 'RDS',
  Backup: 'Backup',
  ApiGateway: 'Api Gateway',
  SES: 'SES',
};

const rulesByLevelDictionnary = groupBy(allRules, 'level');

export const rulesByLevel = SLS_MENTOR_LEVELS.map(level => ({
  type: 'category',
  label: `Level ${level}`,
  items: rulesByLevelDictionnary[level].map(
    ({ fileName }) => `rules/${fileName}`,
  ),
}));

const rulesByCategoryDictionnary = Object.fromEntries(
  CATEGORIES.map(category => [
    category,
    allRules.filter(rule => rule.categories.includes(category)),
  ]),
);
export const rulesByCategory = CATEGORIES.map(category => ({
  type: 'category',
  label: categoryNames[category],
  items: rulesByCategoryDictionnary[category].map(
    ({ fileName }) => `rules/${fileName}`,
  ),
}));

const rulesByServiceDictionnary = groupBy(allRules, 'service');
export const rulesByService = SERVICES.map(service => ({
  type: 'category',
  label: serviceNames[service],
  items: rulesByServiceDictionnary[service].map(
    ({ fileName }) => `rules/${fileName}`,
  ),
}));

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
  path.join(__dirname, '../../sidebars.json'),
  JSON.stringify(sidebars),
);
