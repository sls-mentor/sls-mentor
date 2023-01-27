import { expect } from 'vitest';
import { slsMentorResult } from '../testSetup/slsMentorResult';

export const assertResourceResult = ({
  ruleName,
  resourceName,
  expectedResultForResource,
}: {
  ruleName: string;
  resourceName: string;
  expectedResultForResource: boolean;
}): void => {
  const { result } = slsMentorResult[ruleName];

  expect(result.find(r => r.arn.resource.includes(resourceName))?.success).toBe(
    expectedResultForResource,
  );
};
