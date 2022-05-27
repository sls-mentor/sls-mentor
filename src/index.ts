import {
  CloudFormationClient,
  ListStackResourcesCommand,
} from '@aws-sdk/client-cloudformation';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

import { ARN, parse } from '@aws-sdk/util-arn-parser';
import {
  LightBundleRule,
  noDefaultMemory,
  NoDefaultTimeout,
  NoMaxTimeout,
  NoSharedIamRoles,
} from './rules';

process.env.AWS_PROFILE = 'safetracker-dev';

// index is owner of fetching scoped  resources (CFN or tags).
// each rule owns details fetching

type Resource = { arn: ARN };

export interface Rule {
  ruleName: string;
  errorMessage: string;
  run: (resources: Resource[]) => Promise<{
    results: ({ arn: string; success: boolean } & Record<string, unknown>)[];
  }>;
}

export const runGuardianChecks = async (): Promise<void> => {
  const cloudFormationClient = new CloudFormationClient({});
  const stsClient = new STSClient({});
  const { StackResourceSummaries: resources } = await cloudFormationClient.send(
    new ListStackResourcesCommand({
      StackName: 'safetracker-backend-dev',
    }),
  );
  if (!resources) {
    return;
  }
  const filteredResources = resources.filter(
    resource => resource.ResourceType === 'AWS::Lambda::Function',
  );
  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  const region = cloudFormationClient.config.region;
  const resourcesArn: { arn: ARN }[] = filteredResources.map(resource => {
    return {
      arn: parse(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `arn:aws:lambda:${region}:${Account}:function:${resource.PhysicalResourceId}`,
      ),
    };
  });
  const rules: Rule[] = [
    LightBundleRule,
    noDefaultMemory,
    NoDefaultTimeout,
    NoMaxTimeout,
    NoSharedIamRoles,
  ];
  await Promise.all(rules.map(rule => rule.run(resourcesArn)));
};
