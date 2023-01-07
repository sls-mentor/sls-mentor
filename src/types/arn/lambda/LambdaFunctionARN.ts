import { CustomARN } from '../CustomARN';

export class LambdaFunctionARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'lambda');
  }

  static fromFunctionName = (functionName: string): LambdaFunctionARN =>
    new LambdaFunctionARN(`function:${functionName}`);

  static fromPhysicalId = (physicalId: string): LambdaFunctionARN =>
    LambdaFunctionARN.fromFunctionName(physicalId);

  getFunctionName = (): string => this.resource.split(':')[1];
}
