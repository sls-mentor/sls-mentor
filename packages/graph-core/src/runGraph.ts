import { ArnService, CustomARN, EventBridgeEventBusARN } from '@sls-mentor/arn';
import {
  fetchAccountIdAndRegion,
  fetchAllApiGatewayV2Integrations,
  fetchAllIamRolePolicies,
  fetchAllLambdaConfigurations,
  fetchAllQueuesAttributes,
  fetchAllRestApiGatewayResources,
  getAllRulesOfEventBus,
  getAllTargetsOfEventBridgeRule,
  listAllResources,
} from '@sls-mentor/aws-api';

import { Data, Edge } from 'types';

const servicesToHide: ArnService[] = ['backup', 'iam', 'logs'];

export const runGraph = async ({
  tags,
  cloudformationStacks,
  region,
}: {
  tags?: { key: string; value: string }[];
  cloudformationStacks?: string[];
  region?: string;
}): Promise<Data> => {
  const { region: fetchedRegion, accountId } = await fetchAccountIdAndRegion();
  const regionToUse = region ?? fetchedRegion;
  CustomARN.setup({ accountId, region: regionToUse });
  const arns = await listAllResources({
    cloudformationStacks,
    tags,
    region: regionToUse,
  });

  const [
    lambdaFunctions,
    iamRolePolicies,
    lambdaRoutes,
    restResources,
    eventBridgeTargets,
    queueAttributes,
  ] = await Promise.all([
    fetchAllLambdaConfigurations(arns),
    fetchAllIamRolePolicies(arns),
    fetchAllApiGatewayV2Integrations(arns),
    fetchAllRestApiGatewayResources(arns),
    Promise.all(
      (
        await Promise.all(
          CustomARN.filterArns(arns, EventBridgeEventBusARN).map(
            async eventBus => ({
              arn: eventBus,
              rules: await getAllRulesOfEventBus(eventBus),
            }),
          ),
        )
      )
        .flat()
        .map(async ({ arn, rules }) => {
          const targets = (
            await Promise.all(rules.map(getAllTargetsOfEventBridgeRule))
          ).flat();

          return targets.map(target => ({
            arn,
            target,
          }));
        }),
    ),
    fetchAllQueuesAttributes(arns),
  ]);

  const lambdaFunctionsAndRoleArn = lambdaFunctions.map(l => ({
    ...l,
    rolePolicies:
      iamRolePolicies.find(({ arn }) =>
        arn.is(CustomARN.fromArnString(l.configuration.Role ?? '')),
      )?.policies ?? [],
  }));

  const edges: Edge[] = [
    ...lambdaFunctionsAndRoleArn
      .map(({ arn, rolePolicies }) => {
        return rolePolicies.map(policy => {
          const resources = (policy.policy.Statement ?? []).map(
            ({ Resource }) => {
              if (typeof Resource === 'string') {
                return [Resource];
              }

              if (Array.isArray(Resource)) {
                return Resource;
              }

              return [];
            },
          );

          return resources.map(resource =>
            resource.map(r => ({
              from: arn.toString(),
              to: r.replace(/\/\*$/, ''),
            })),
          );
        });
      })
      .flat(3),
    ...lambdaRoutes
      .map(({ arn, targets }) =>
        targets.map(target => ({
          from: arn.toString(),
          to: target.uri,
        })),
      )
      .flat(),
    ...eventBridgeTargets.flat().map(target => ({
      from: target.arn.toString(),
      to: target.target.Arn ?? '*',
    })),
    ...restResources
      .map(({ arn, resources }) =>
        resources.map(resource => {
          const methods = resource.resourceMethods ?? {};

          return Object.entries(methods).map(([, { methodIntegration }]) => {
            const uri = methodIntegration?.uri ?? '';
            const uriArn =
              uri
                .match(/(arn:aws:lambda:.*:.*:function:.*)\//)?.[0]
                ?.slice(0, -1) ?? '*';

            return {
              from: arn.toString(),
              to: uriArn,
            };
          });
        }),
      )
      .flat(2),
    ...queueAttributes.flatMap(({ arn, attributes }) => {
      const deadLetterTargetArn = (
        JSON.parse(attributes.Attributes?.RedrivePolicy ?? '{}') as {
          deadLetterTargetArn?: string;
        }
      ).deadLetterTargetArn;

      return deadLetterTargetArn !== undefined
        ? [
            {
              from: arn.toString(),
              to: deadLetterTargetArn,
            },
          ]
        : [];
    }),
  ];
  const relevantArns = arns.filter(
    arn => !servicesToHide.includes(arn.service),
  );

  const uniqueEdges = Array.from(
    edges.reduce((acc, edge) => {
      const stringifiedEdge = JSON.stringify(edge);

      if (acc.has(stringifiedEdge)) {
        return acc;
      }

      acc.add(stringifiedEdge);

      return acc;
    }, new Set<string>()),
  ).map(e => JSON.parse(e) as Edge);
  const relevantEdges = uniqueEdges
    .filter(({ from, to }) => from !== '*' && to !== '*')
    .map(({ from, to }) => ({
      from: CustomARN.fromArnString(from),
      to: CustomARN.fromArnString(to),
    }))
    .filter(
      (edge): edge is { from: CustomARN; to: CustomARN } =>
        relevantArns.some(arn => arn.is(edge.from)) &&
        relevantArns.some(arn => arn.is(edge.to)),
    );

  return {
    nodes: Object.fromEntries(
      relevantArns.map(arn => {
        const stringifiedArn = arn.toString();

        return [stringifiedArn, { arn: stringifiedArn }];
      }),
    ),
    edges: relevantEdges.map(({ from, to }) => ({
      from: from.toString(),
      to: to.toString(),
    })),
  };
};
