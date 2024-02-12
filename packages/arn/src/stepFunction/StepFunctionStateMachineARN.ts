import { ArnService } from 'types';

import { CustomARN } from '../CustomARN';

export class StepFunctionStateMachineARN extends CustomARN {
  constructor(resource: string) {
    super(resource, ArnService.states);
  }

  static fromStateMachineName = (name: string): StepFunctionStateMachineARN =>
    new StepFunctionStateMachineARN(`stateMachine:${name}`);

  static fromPhysicalId = (physicalId: string): StepFunctionStateMachineARN => {
    const parsedArn = CustomARN.fromArnString(physicalId);
    if (!parsedArn) {
      throw new Error('Invalid Step Function State Machine ARN');
    }

    return this.fromCustomARN(parsedArn);
  };

  getStateMachineName = (): string => {
    const name = this.resource.split(':')[1];

    if (name === undefined) {
      throw new Error('Invalid State Machine ARN');
    }

    return name;
  };

  static is = (arn: CustomARN): boolean =>
    arn.service === ArnService.states && !arn.resource.startsWith('function:');

  static fromCustomARN = (arn: CustomARN): StepFunctionStateMachineARN => {
    if (!StepFunctionStateMachineARN.is(arn)) {
      throw new Error('Invalid Step Function State Machine ARN');
    }

    return new StepFunctionStateMachineARN(arn.resource);
  };
}
