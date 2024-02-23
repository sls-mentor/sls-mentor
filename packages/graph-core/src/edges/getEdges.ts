import {
  ArnService,
  CustomARN,
  EventBridgeEventBusARN,
  LambdaFunctionARN,
} from '@sls-mentor/arn';
import {
  fetchAllGraphqlApiResources,
  fetchAllIamRolePolicies,
  fetchAllLambdaConfigurations,
  fetchAllQueuesAttributes,
  fetchAllStepFunctionConfigurations,
  getAllRulesOfEventBus,
  getAllTargetsOfEventBridgeRule,
} from '@sls-mentor/aws-api';

import { Edge } from 'types';

import { getHttpApiEdges, getRestApiEdges } from './apiGateway';
import { findArnsFromDataSources } from './appSync';
import { findLambdasInDefinition } from './stepFunction/findLambdasInDefinition';

export const getEdges = async (
  arns: CustomARN[],
  servicesToHide: ArnService[],
): Promise<Edge[]> => {
  const [
    lambdaFunctions,
    iamRolePolicies,
    httpApiEdges,
    restApiEdges,
    eventBridgeTargets,
    queueAttributes,
    stateMachineDefinition,
    graphqlApiResources,
  ] = await Promise.all([
    fetchAllLambdaConfigurations(arns),
    fetchAllIamRolePolicies(arns),
    getHttpApiEdges(arns),
    getRestApiEdges(arns),
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
    fetchAllStepFunctionConfigurations(arns),
    fetchAllGraphqlApiResources(arns),
  ]);

  const lambdaFunctionsAndRoleArn = lambdaFunctions.map(l => ({
    ...l,
    rolePolicies:
      iamRolePolicies.find(({ arn }) =>
        arn.is(CustomARN.fromArnString(l.configuration.Role ?? '')),
      )?.policies ?? [],
  }));

  const rawEdges: Edge[] = [
    ...graphqlApiResources
      .map(({ arn, dataSources }) => {
        const dataSourcesArns = findArnsFromDataSources(dataSources);

        return dataSourcesArns.map(dataSourceArn => ({
          from: arn.toString(),
          to: dataSourceArn,
          warnings: [],
        }));
      })
      .flat(1),
    ...stateMachineDefinition
      .map(({ arn, definition }) => {
        const lambdaArns = findLambdasInDefinition(definition);

        return lambdaArns.map(lambdaArn => ({
          from: arn.toString(),
          to: LambdaFunctionARN.fromFunctionName(
            LambdaFunctionARN.fromCustomARN(
              CustomARN.fromArnString(lambdaArn) as CustomARN,
            ).getFunctionName(),
          ).toString(),
          warnings: [],
        }));
      })
      .flat(1),
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
              warnings: [],
            })),
          );
        });
      })
      .flat(3),
    ...httpApiEdges,
    ...eventBridgeTargets.flat().map(target => ({
      from: target.arn.toString(),
      to: target.target.Arn ?? '*',
      warnings: [],
    })),
    ...restApiEdges,
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
              warnings: [],
            },
          ]
        : [];
    }),
  ];

  const seenEdges = new Set<string>();
  const uniqueEdges = rawEdges.filter(edge => {
    const stringifiedEdge = `${edge.from}->${edge.to}`;

    if (seenEdges.has(stringifiedEdge)) {
      return false;
    }

    seenEdges.add(stringifiedEdge);

    return true;
  });

  return uniqueEdges
    .filter(({ from, to }) => from !== '*' && to !== '*')
    .filter(({ from, to }) => {
      // There are still problems with some resources that do not have a valid ARN format
      try {
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
      } catch (e) {
        return false;
      }
    });
};
