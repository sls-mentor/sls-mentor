/* eslint-disable complexity */
import { CustomARN } from '@sls-mentor/arn';
import { fetchAccountIdAndRegion, listAllResources } from '@sls-mentor/aws-api';
import { Configuration, SlsMentorLevel } from '@sls-mentor/rules';

import { runChecks, RunChecksHooks } from './checks';
import { ChecksResults } from './types';

export type RunSlsMentorHooks = RunChecksHooks & {
  beforeFetchAllResources?: ({
    tags,
    cloudformationStacks,
  }: {
    tags?: { key: string; value: string }[];
    cloudformationStacks?: string[];
  }) => void;
  afterFetchAllResources?: (resources: CustomARN[]) => void;
  beforeSetupCredentials?: () => void;
  afterSetupCredentials?: () => void;
};

export const runSlsMentor = async ({
  configuration,
  level,
  cloudformationStacks,
  tags,
  profile,
  region,
  debug = false,
  hooks = {},
}: {
  configuration: Configuration;
  level: SlsMentorLevel;
  cloudformationStacks?: string[];
  tags?: { key: string; value: string }[];
  profile?: string;
  region?: string;
  debug?: boolean;
  hooks?: RunSlsMentorHooks;
}): Promise<
  | {
      error: false;
      success: boolean;
      checksResults: ChecksResults;
    }
  | {
      error: true;
      message: string;
    }
> => {
  let regionToUse: string;
  try {
    if (hooks.beforeSetupCredentials) {
      hooks.beforeSetupCredentials();
    }

    const { region: fetchedRegion, accountId } =
      await fetchAccountIdAndRegion();

    regionToUse = region ?? fetchedRegion;

    CustomARN.setup({
      accountId,
      region: regionToUse,
    });

    if (hooks.afterSetupCredentials) {
      hooks.afterSetupCredentials();
    }
  } catch (e) {
    if (debug) {
      console.info(e);
    }

    if (profile === undefined) {
      return {
        error: true,
        message: `Unable to retrieve AccountId and Region, check that your AWS credentials are correctly set and has the needed rights or specify another profile using -p option`,
      };
    }

    return {
      error: true,
      message: `Unable to retrieve AccountId and Region from profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
    };
  }

  const allResourcesArns: CustomARN[] = [];
  try {
    if (hooks.beforeFetchAllResources) {
      hooks.beforeFetchAllResources({
        tags,
        cloudformationStacks,
      });
    }

    allResourcesArns.push(
      ...(
        await listAllResources({
          cloudformationStacksToFilter: cloudformationStacks,
          tagsToFilter: tags?.map(({ key, value }) => ({
            Key: key,
            Value: value,
          })),
          region: regionToUse,
        })
      ).map(({ arn }) => arn),
    );

    if (hooks.afterFetchAllResources) {
      hooks.afterFetchAllResources(allResourcesArns);
    }
  } catch (e) {
    if (debug) {
      console.info(e);
    }

    if (profile === undefined) {
      return {
        error: true,
        message: `Unable to fetch AWS resources, check that your AWS credentials are correctly set and has the needed rights or specify another profile using -p option`,
      };
    }

    return {
      error: true,
      message: `Unable to fetch AWS resources, check that profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
    };
  }

  const checksResults: ChecksResults = [];
  try {
    checksResults.push(
      ...(await runChecks({
        resourcesToCheck: allResourcesArns,
        level,
        rulesConfigurations: configuration.rules,
        hooks: {
          beforeAllRules: hooks.beforeAllRules,
          beforeEachRule: hooks.beforeEachRule,
          afterEachRule: hooks.afterEachRule,
          afterAllRules: hooks.afterAllRules,
        },
      })),
    );
  } catch (e) {
    if (debug) {
      console.info(e);
    }

    if (profile === undefined) {
      return {
        error: true,
        message: `One of the checks failed to run, check that your AWS credentials are correctly set and has the needed rights or specify another profile using -p option`,
      };
    }

    return {
      error: true,
      message: `One of the checks failed to run, check that profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
    };
  }

  const atLeastOneFailed = checksResults.some(
    ({ result }) => result.filter(resource => !resource.success).length > 0,
  );

  return {
    success: !atLeastOneFailed,
    error: false,
    checksResults,
  };
};
