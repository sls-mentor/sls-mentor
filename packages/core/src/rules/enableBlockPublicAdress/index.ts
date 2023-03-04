import { fetchAllPublicAccessBlockConfiguration } from '../../aws-sdk-helpers';
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

export const enableBlockPublicAdress: Rule = {
  ruleName: 'Enable block public adress',
  errorMessage: 'This bucket does not enable block public adress',
  run,
  fileName: 'enableBlockPublicAdress',
  categories: ['Security'],
  level: 1,
  service: 'S3',
};
