import { fetchAllPublicAccessBlockConfiguration } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const publicAccessBlockConfigurations =
    await fetchAllPublicAccessBlockConfiguration(resourceArns);
  const results = publicAccessBlockConfigurations.map(
    ({ arn, configuration }) => {
      if (configuration === undefined) {
        return {
          arn,
          success: false,
        };
      }
      const isOK =
        configuration.BlockPublicAcls === true &&
        configuration.BlockPublicPolicy === true &&
        configuration.IgnorePublicAcls === true &&
        configuration.RestrictPublicBuckets === true;

      return {
        arn,
        success: isOK,
      };
    },
  );

  return { results };
};

export const enableBlockPublicAccess: Rule = {
  ruleName: 'Enable block public access',
  errorMessage: 'This bucket does not enable block public access',
  run,
  fileName: 'enableBlockPublicAccess',
  categories: ['Security'],
  level: 1,
  service: 'S3',
  easyToFix: true,
  severity: 'high',
  stage: [Stage.dev, Stage.prod],
};
