import { CustomARN } from '../CustomARN';

export class EventBridgeEventBusARN extends CustomARN {
  constructor(resource: string) {
    super(resource, 'events');
  }

  static fromEventBusName = (eventBusName: string): EventBridgeEventBusARN =>
    new EventBridgeEventBusARN(`event-bus/${eventBusName}`);

  static fromPhysicalId = (physicalId: string): EventBridgeEventBusARN =>
    EventBridgeEventBusARN.fromEventBusName(physicalId);

  getEventBusName = (): string => {
    const eventBusName = this.resource.split('/')[1];

    if (eventBusName === undefined) {
      throw new Error('Invalid EventBridge Event Bus ARN');
    }

    return eventBusName;
  };
}
