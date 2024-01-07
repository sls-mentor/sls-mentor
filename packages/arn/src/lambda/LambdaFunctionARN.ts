import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class LambdaFunctionARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.lambda);
  }

  static fromFunctionName = (functionName: string): LambdaFunctionARN =>
    new LambdaFunctionARN(`function:${functionName}`);

  static fromPhysicalId = (physicalId: string): LambdaFunctionARN =>
    LambdaFunctionARN.fromFunctionName(physicalId);

  getFunctionName = (): string => {
    const functionName = this.resource.split(':')[1];

    if (functionName === undefined) {
      throw new Error('Invalid Lambda Function ARN');
    }

    return functionName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.lambda && arn.resource.startsWith('function:');

  static fromCustomARN = (arn: CustomARN): LambdaFunctionARN => {
    if (!LambdaFunctionARN.is(arn)) {
      throw new Error('Invalid Lambda Function ARN');
    }

    return new LambdaFunctionARN(arn.resource);
  };
}
