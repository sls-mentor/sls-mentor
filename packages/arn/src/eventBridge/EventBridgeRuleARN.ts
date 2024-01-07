import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class EventBridgeRuleARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.events);
  }

  static fromRuleName = (ruleName: string): EventBridgeRuleARN =>
    new EventBridgeRuleARN(`rule/${ruleName}`);

  getRuleName = (): string => {
    const ruleName = this.resource.split('/')[1];

    if (ruleName === undefined) {
      throw new Error('Invalid EventBridge Rule ARN');
    }

    return ruleName;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.events && arn.resource.startsWith('rule/');

  static fromCustomARN = (arn: CustomARN): EventBridgeRuleARN => {
    if (!EventBridgeRuleARN.is(arn)) {
      throw new Error('Invalid EventBridge Rule ARN');
    }

    return new EventBridgeRuleARN(arn.resource);
  };
}
