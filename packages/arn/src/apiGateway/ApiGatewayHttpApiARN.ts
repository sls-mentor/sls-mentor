import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class ApiGatewayHttpApiARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.apigateway);
  }

  static fromApiId = (apiGatewayV2Id: string): ApiGatewayHttpApiARN =>
    new ApiGatewayHttpApiARN(`/apis/${apiGatewayV2Id}`);

  static fromPhysicalId = (physicalId: string): ApiGatewayHttpApiARN =>
    this.fromApiId(physicalId);

  getApiId = (): string => {
    const apiId = this.resource.split('/')[2];

    if (apiId === undefined) {
      throw new Error('Invalid API Gateway HTTP API ARN');
    }

    return apiId;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.apigateway && arn.resource.startsWith('/apis/');

  static fromCustomARN = (arn: CustomARN): ApiGatewayHttpApiARN => {
    if (!ApiGatewayHttpApiARN.is(arn)) {
      throw new Error('Invalid API Gateway HTTP API ARN');
    }

    return new ApiGatewayHttpApiARN(arn.resource);
  };
}
