import { Construct } from 'constructs';

import { underMaxMemory as UnderMaxMemoryRule } from '@sls-mentor/rules';

import { DefaultFunction } from '../defaultConstructs';

const AWS_HISTORICAL_MAX_MEMORY = 3008;

interface UnderMaxMemoryProps {
  memory: number;
}

export class UnderMaxMemory extends Construct {
  static passTestCases: Record<string, UnderMaxMemoryProps> = {
    'Memory 512': { memory: 512 },
  };

  static failTestCases: Record<string, UnderMaxMemoryProps> = {
    'Max Memory': { memory: AWS_HISTORICAL_MAX_MEMORY },
  };

  constructor(scope: Construct, id: string, { memory }: UnderMaxMemoryProps) {
    super(scope, id);
    const lambdaFunction = new DefaultFunction(this, 'LambdaFunction', {
      memorySize: memory,
    });
    lambdaFunction.tagRule(UnderMaxMemoryRule);
  }
}
