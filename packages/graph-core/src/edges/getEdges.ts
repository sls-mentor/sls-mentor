import { ArnService, CustomARN, EventBridgeEventBusARN } from '@sls-mentor/arn';
import {
  fetchAllApiGatewayV2Integrations,
  fetchAllIamRolePolicies,
  fetchAllLambdaConfigurations,
  fetchAllQueuesAttributes,
  fetchAllRestApiGatewayResources,
  getAllRulesOfEventBus,
  getAllTargetsOfEventBridgeRule,
} from '@sls-mentor/aws-api';

import { Edge } from 'types';

export const getEdges = async (
  arns: CustomARN[],
  servicesToHide: ArnService[],
): Promise<Edge[]> => {
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

  const rawEdges: Edge[] = [
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
              to:
                r === '*'
                  ? '*'
                  : CustomARN.fromArnString(
                      r.replace(/\/\*$/, ''),
                    )?.toString() ?? '*',
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

  const uniqueEdges = Array.from(
    rawEdges.reduce((acc, edge) => {
      const stringifiedEdge = `${edge.from}->${edge.to}`;

      if (acc.has(stringifiedEdge)) {
        return acc;
      }

      acc.add(stringifiedEdge);

      return acc;
    }, new Set<string>()),
  ).map(e => {
    const [from, to] = e.split('->');

    if (from === undefined || to === undefined) {
      throw new Error('Unexpected undefined value in edge');
    }

    return {
      from,
      to,
    };
  });

  return uniqueEdges
    .filter(({ from, to }) => from !== '*' && to !== '*')
    .filter(({ from, to }) => {
      const fromArn = CustomARN.fromArnString(from);
      const toArn = CustomARN.fromArnString(to);

      return (
        fromArn !== undefined &&
        toArn !== undefined &&
        !servicesToHide.includes(fromArn.service) &&
        !servicesToHide.includes(toArn.service) &&
        arns.some(arn => arn.is(fromArn)) &&
        arns.some(arn => arn.is(toArn))
      );
    });
};
