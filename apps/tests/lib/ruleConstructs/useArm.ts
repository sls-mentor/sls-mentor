import { useArm as UseArmRule } from '@sls-mentor/core';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { DefaultFunction } from '../common';

interface UseArmProps {
  architecture: Architecture;
}

export class UseArm extends Construct {
  static passTestCases: Record<string, UseArmProps> = {
    'ARM architecture': { architecture: Architecture.ARM_64 },
  };

  static failTestCases: Record<string, UseArmProps> = {
    'X86 architecture': { architecture: Architecture.X86_64 },
  };

  constructor(scope: Construct, id: string, { architecture }: UseArmProps) {
    super(scope, id);
    const lambdaFunction = new DefaultFunction(this, 'LambdaFunction', {
      architecture,
    });
    lambdaFunction.tagRule(UseArmRule);
  }
}
