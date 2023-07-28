import { CustomARN } from '../CustomARN';

export class RestApiGatewayApiARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'apigateway');
  }

  static fromApiId = (apiGatewayId: string): RestApiGatewayApiARN =>
    new RestApiGatewayApiARN(`/restapis/${apiGatewayId}`);

  static fromPhysicalId = (physicalId: string): RestApiGatewayApiARN =>
    this.fromApiId(physicalId);

  getApiId = (): string => this.resource.split('/')[2];
}
