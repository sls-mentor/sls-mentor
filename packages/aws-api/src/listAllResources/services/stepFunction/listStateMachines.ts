import {
  paginateListStateMachines,
  StateMachineListItem,
} from '@aws-sdk/client-sfn';

import { StepFunctionStateMachineARN } from '@sls-mentor/arn';

import { stepFunctionClient } from 'clients';

export const listStateMachines = async (): Promise<
  StepFunctionStateMachineARN[]
> => {
  const stateMachines: StateMachineListItem[] = [];

  try {
    for await (const resources of paginateListStateMachines(
      { client: stepFunctionClient },
      {},
    )) {
      stateMachines.push(...(resources.stateMachines ?? []));
    }

    return stateMachines.map(({ name }) =>
      StepFunctionStateMachineARN.fromStateMachineName(name ?? ''),
    );
  } catch (e) {
    console.log(
      'There was an issue while getting StepFunctionStateMachines: ',
      {
        e,
      },
    );

    return [];
  }
};
