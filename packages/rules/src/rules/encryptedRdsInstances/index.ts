import { fetchAllRdsInstancesDescriptions } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const run: Rule['run'] = async resourceArns => {
  const rdsInstances = await fetchAllRdsInstancesDescriptions(resourceArns);

  const results = rdsInstances.map(({ arn, description }) => ({
    arn,
    success: description?.StorageEncrypted === true,
  }));

  return { results };
};

export const encryptedRdsInstances: Rule = {
  ruleName: 'RDS: Database instances should be encrypted',
  errorMessage: 'RDS instances unencrypted found',
  run,
  fileName: 'encryptedRdsInstances',
  categories: ['Security'],
  level: 5,
  service: 'RDS',
  easyToFix: false,
  severity: 'low',
  stages: [Stage.prod, Stage.dev],
};
