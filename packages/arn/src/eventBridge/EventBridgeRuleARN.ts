import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class EventBridgeRuleARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.events);
  }

  static fromRuleName = (ruleName: string): EventBridgeRuleARN =>
    new EventBridgeRuleARN(`rule/${ruleName}`);
}
