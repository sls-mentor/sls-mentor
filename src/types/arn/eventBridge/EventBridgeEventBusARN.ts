import { GuardianARN } from '../GuardianARN';

export class EventBridgeEventBusARN extends GuardianARN {
  constructor(resource: string) {
    super(resource, 'events');
  }

  static fromEventBusName = (eventBusName: string): EventBridgeEventBusARN =>
    new EventBridgeEventBusARN(`event-bus/${eventBusName}`);

  static fromPhysicalId = (physicalId: string): EventBridgeEventBusARN =>
    EventBridgeEventBusARN.fromEventBusName(physicalId);
}
