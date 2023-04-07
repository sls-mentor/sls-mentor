import { Construct } from 'constructs';
import { DefaultFunction } from '../../../tests/constructs';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { underMaxMemory as UnderMaxMemoryRule } from './index';

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
