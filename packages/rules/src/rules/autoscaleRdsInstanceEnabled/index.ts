import { fetchAllRdsInstancesDescriptions } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const run: Rule['run'] = async resourceArns => {
  const rdsInstancesDescriptions = await fetchAllRdsInstancesDescriptions(
    resourceArns,
  );
  const filteredRdsInstancesDescriptions = rdsInstancesDescriptions.filter(
    instance =>
      instance.description?.Engine !== 'aurora-mysql' &&
      instance.description?.Engine !== 'SQLServer' &&
      instance.description?.MultiAZ !== true &&
      // Aurora and Microsoft instances are configured like below
      instance.description?.MaxAllocatedStorage !== 1,
  );
  const results = filteredRdsInstancesDescriptions.map(
    ({ arn, description }) => ({
      arn,
      success:
        description?.AllocatedStorage !== undefined &&
        description.MaxAllocatedStorage !== undefined &&
        description.MaxAllocatedStorage >= 1.26 * description.AllocatedStorage,
    }),
  );

  return { results };
};

export const autoscaleRdsInstanceEnabled: Rule = {
  ruleName: 'Autoscaling is possible for RDS instances',
  errorMessage:
    'Autoscaling is not possible for this RDS instance with current settings.',
  run,
  fileName: 'autoscaleRdsInstanceEnabled',
  categories: ['Stability'],
  level: 3,
  service: 'RDS',
  easyToFix: true,
  severity: 'medium',
};
