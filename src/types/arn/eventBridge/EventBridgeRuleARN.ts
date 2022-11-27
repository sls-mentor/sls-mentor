import { GuardianARN } from '../GuardianARN';

export class EventBridgeRuleARN extends GuardianARN {
  constructor(resource: string) {
    super(resource, 'events');
  }

  static fromRuleName = (ruleName: string): EventBridgeRuleARN =>
    new EventBridgeRuleARN(`rule/${ruleName}`);
}
