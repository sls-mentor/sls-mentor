import {
  paginateGetResources,
  ResourceGroupsTaggingAPIClient,
  ResourceTagMapping,
} from '@aws-sdk/client-resource-groups-tagging-api';
import type { Rule, RuleCheckResult } from '@sls-mentor/core';
import { CustomARN, rules } from '@sls-mentor/core';
import type { ChecksResults } from 'sls-mentor';
import { runSlsMentor } from 'sls-mentor/src/slsMentor';
import { beforeAll, describe, expect, it } from 'vitest';

type Tag = {
  key: string;
  value: string;
};

const fetchTaggedResourceArns = async (tags: Tag[]): Promise<CustomARN[]> => {
  const tagClient = new ResourceGroupsTaggingAPIClient({});

  const taggedResources: ResourceTagMapping[] = [];
  for await (const page of paginateGetResources(
    { client: tagClient },
    {
      TagFilters: tags.map(({ key, value }) => {
        return { Key: key, Values: [value] };
      }),
    },
  )) {
    taggedResources.push(...(page.ResourceTagMappingList ?? []));
  }

  return taggedResources
    .map(({ ResourceARN }) => ResourceARN)
    .filter((resourceArn): resourceArn is string => resourceArn !== undefined)
    .map(CustomARN.fromArnString);
};

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
  let success: boolean;
  let checksResults: ChecksResults | undefined;
  beforeAll(async () => {
    ({ checksResults, success } = await runSlsMentor({
      awsProfile: process.env.AWS_PROFILE,
      awsRegion: process.env.AWS_REGION,
      noFail: true,
      short: false,
      getJsonResults: true,
      level: '5',
      cloudformationStacks: ['StackSuccess'],
    }));
  });

  it('should have run sls-mentor successfully', () => {
    expect(success).toBe(true);
  });

  it.each(Object.values(rules).map(rule => ({ ruleName: rule.ruleName })))(
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
  let success: boolean;
  let checksResults: ChecksResults | undefined;
  beforeAll(async () => {
    ({ checksResults, success } = await runSlsMentor({
      awsProfile: process.env.AWS_PROFILE,
      awsRegion: process.env.AWS_REGION,
      noFail: true,
      short: false,
      getJsonResults: true,
      level: '5',
      cloudformationStacks: ['StackFail'],
    }));
  });

  it('should have run sls-mentor successfully', () => {
    expect(success).toBe(true);
  });

  describe.each(
    Object.values(rules).map(rule => ({ ruleName: rule.ruleName })),
  )(
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
        resourcesExpectedToFail = await fetchTaggedResourceArns([
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
