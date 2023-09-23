import { config } from 'dotenv';
import { beforeAll, describe, expect, it } from 'vitest';

import { CustomARN } from '@sls-mentor/arn';
import { listAllResourcesFromTags } from '@sls-mentor/aws-api';
import { ChecksResults, runSlsMentor } from '@sls-mentor/core';
import { allRules, Rule, RuleCheckResult } from '@sls-mentor/rules';

import { STACK_FAIL_NAME, STACK_SUCCESS_NAME } from '../index';

expect.extend({
  toHaveSuccessfullyPassedSlsMentorRule: ({
    arn,
    success,
  }: RuleCheckResult) => ({
    message: () =>
      `expected resource with ARN ${arn.toString()} to be successfully validated`,
    pass: success,
  }),
  toFailSlsMentorRule: ({ arn, success }: RuleCheckResult) => ({
    message: () =>
      `expected resource with ARN ${arn.toString()} to fail validation`,
    pass: !success,
  }),
});

interface CustomMatchers {
  toHaveSuccessfullyPassedSlsMentorRule(): void;
  toFailSlsMentorRule(): void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

describe('Successful resources', () => {
  if (process.env.CI !== 'true') {
    config();
  }

  let success: boolean;
  let checksResults: ChecksResults | undefined;
  beforeAll(async () => {
    const runResults = await runSlsMentor({
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION,
      level: 5,
      cloudformationStacks: [STACK_SUCCESS_NAME],
      configuration: {},
      debug: true,
    });

    if (runResults.error) {
      throw new Error(runResults.message);
    }

    ({ checksResults, success } = runResults);
  });

  it('should have run sls-mentor successfully', () => {
    expect(success).toBe(true);
  });

  it.each(allRules.map(rule => ({ ruleName: rule.ruleName })))(
    'should validate for all resources the rule $ruleName',
    ({ ruleName }) => {
      const checksResultForRule = checksResults?.find(
        checksResult => checksResult.rule.ruleName === ruleName,
      );
      expect(checksResultForRule).not.toBe(undefined);
      (checksResultForRule?.result ?? []).map(result =>
        expect(result).toHaveSuccessfullyPassedSlsMentorRule(),
      );
    },
  );
});

describe('Failed resources', () => {
  if (process.env.CI !== 'true') {
    config();
  }

  let success: boolean;
  let checksResults: ChecksResults | undefined;
  beforeAll(async () => {
    const runResults = await runSlsMentor({
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION,
      level: 5,
      cloudformationStacks: [STACK_FAIL_NAME],
      configuration: {},
      debug: true,
    });

    if (runResults.error) {
      throw new Error(runResults.message);
    }

    ({ checksResults, success } = runResults);
  });

  it('should not have run sls-mentor successfully', () => {
    expect(success).toBe(false);
  });

  describe.each(allRules.map(rule => ({ ruleName: rule.ruleName })))(
    'should fail for specific resources for the rule $ruleName',
    ({ ruleName }) => {
      let checksResultForRule:
        | {
            rule: Rule;
            result: RuleCheckResult[];
          }
        | undefined;
      let resourcesExpectedToFail: CustomARN[];
      beforeAll(async () => {
        checksResultForRule = checksResults?.find(
          checksResult => checksResult.rule.ruleName === ruleName,
        );
        resourcesExpectedToFail = await listAllResourcesFromTags([
          { key: 'rule', value: ruleName },
        ]);
      });

      it('should have checked resources', () => {
        expect(checksResultForRule).not.toBe(undefined);
      });

      it('should fail for specific resources', () => {
        checksResultForRule?.result.map(checkResultForRule => {
          const correspondingExpectedToFailResource =
            resourcesExpectedToFail.find(arn => arn.is(checkResultForRule.arn));
          if (correspondingExpectedToFailResource !== undefined) {
            expect(checkResultForRule).toFailSlsMentorRule();
          }
        });
      });
    },
  );
});
