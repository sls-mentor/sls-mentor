import { parse } from '@aws-sdk/util-arn-parser';

import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class AppSyncApiARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.appsync);
  }

  static fromApiArn = (arnString: string): AppSyncApiARN => {
    const parsedArn = parse(arnString);

    return new AppSyncApiARN(parsedArn.resource);
  };

  static getApiId = (arn: AppSyncApiARN): string => {
    const apiId = arn.resource.split('apis/')[1];

    if (apiId === undefined) {
      throw new Error('Invalid App Sync API ARN');
    }

    return apiId;
  };

  static fromPhysicalId = (physicalId: string): AppSyncApiARN =>
    AppSyncApiARN.fromApiArn(physicalId);

  static fromAppSyncApiId = (apiId: string): AppSyncApiARN =>
    new AppSyncApiARN(`apis/${apiId}`);

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.appsync && arn.resource.startsWith('apis/');

  static fromCustomARN = (arn: CustomARN): AppSyncApiARN => {
    if (!AppSyncApiARN.is(arn)) {
      throw new Error('Invalid App Sync API ARN');
    }

    return new AppSyncApiARN(arn.resource);
  };
}
