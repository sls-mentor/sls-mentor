import { CustomARN } from '../CustomARN';

export class ApiGatewayV2ApiARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'apigateway');
  }

  static fromApiId = (apiGatewayV2Id: string): ApiGatewayV2ApiARN =>
    new ApiGatewayV2ApiARN(`/apis/${apiGatewayV2Id}`);

  static fromPhysicalId = (physicalId: string): ApiGatewayV2ApiARN =>
    this.fromApiId(physicalId);

  getApiId = (): string => this.resource.split('/')[2];
}
