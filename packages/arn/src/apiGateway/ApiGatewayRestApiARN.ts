import { CustomARN } from '../CustomARN';

export class ApiGatewayRestApiARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'apigateway');
  }

  static fromApiId = (apiGatewayId: string): ApiGatewayRestApiARN =>
    new ApiGatewayRestApiARN(`/restapis/${apiGatewayId}`);

  static fromPhysicalId = (physicalId: string): ApiGatewayRestApiARN =>
    this.fromApiId(physicalId);

  getApiId = (): string => {
    const apiId = this.resource.split('/')[2];

    if (apiId === undefined) {
      throw new Error('Invalid API Gateway REST API ARN');
    }

    return apiId;
  };
}
