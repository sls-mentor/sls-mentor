import { Construct } from 'constructs';
import { DefaultFunction } from '../../../tests/constructs';
import { noDefaultMemory as NoDefaultMemoryRule } from './index';

interface NoDefaultMemoryProps {
  memory: number;
}

export class NoDefaultMemory extends Construct {
  static passTestCases: Record<string, NoDefaultMemoryProps> = {
    'Memory 512': { memory: 512 },
  };

  static failTestCases: Record<string, NoDefaultMemoryProps> = {
    'Memory 1024': { memory: 1024 },
  };

  constructor(scope: Construct, id: string, { memory }: NoDefaultMemoryProps) {
    super(scope, id);
    const lambdaFunction = new DefaultFunction(this, 'LambdaFunction', {
      memorySize: memory,
    });
    lambdaFunction.tagRule(NoDefaultMemoryRule);
  }
}
