import { ARN } from '@aws-sdk/util-arn-parser';

const filterServiceFromResourceArns = (
  resources: ARN[],
  service: string,
): ARN[] => resources.filter(arn => arn.service === service);

export default filterServiceFromResourceArns;
