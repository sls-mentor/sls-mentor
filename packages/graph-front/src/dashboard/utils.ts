import { ArnService } from '@sls-mentor/arn';
import { Node } from '@sls-mentor/graph-core';

export const getOrderedStats = <N extends Node>(
  nodes: Record<string, Node>,
  filterFn: (node: Node) => boolean,
  selector: (node: N) => number | undefined,
  format: (node: N) => string,
  factor = 1,
) => {
  const stats = Object.values(nodes)
    .filter((node): node is N => filterFn(node))
    .map(node => {
      const value = selector(node);

      return {
        label: format(node),
        value: value === undefined ? undefined : value * factor,
      };
    })
    .filter(
      (node): node is { label: string; value: number } =>
        node.value !== undefined,
    )
    .sort((a, b) => b.value - a.value);

  return stats;
};

export const getServiceColor = (service: ArnService) => {
  switch (service) {
    case 'lambda':
      return '#f90';
    case 'dynamodb':
    case 'rds':
    case 'ses':
      return '#527FFF';
    case 's3':
    case 'backup':
      return '#6CAE3E';
    case 'sqs':
    case 'sns':
    case 'events':
    case 'cloudformation':
    case 'appsync':
    case 'states':
    case 'logs':
      return '#FF4F8B';
    case 'apigateway':
    case 'cloudfront':
    case 'ec2':
      return '#A166FF';
    case 'cognito-idp':
    case 'iam':
    case 'secretsmanager':
      return '#FF5252';
    default: {
      const _exhaustiveCheck: never = service;

      return _exhaustiveCheck;
    }
  }
};

export const getAmountAndUnit = ({
  value,
  unit,
}: {
  value: number;
  unit: string;
}): {
  value: string;
  unit: string;
} => {
  switch (true) {
    case value < 1_000:
      return { value: value.toFixed(0), unit };
    case value < 1_000_000:
      return { value: Math.floor(value / 1_000).toFixed(1), unit: 'K' + unit };
    case value < 1_000_000_000:
      return {
        value: Math.floor(value / 1_000_000).toFixed(1),
        unit: 'M' + unit,
      };
    case value < 1_000_000_000_000:
      return {
        value: Math.floor(value / 1_000_000_000).toFixed(1),
        unit: 'G' + unit,
      };
    case value < 1_000_000_000_000_000:
      return {
        value: Math.floor(value / 1_000_000_000_000).toFixed(1),
        unit: 'T' + unit,
      };
    case value < 1_000_000_000_000_000_000:
      return {
        value: Math.floor(value / 1_000_000_000_000_000).toFixed(1),
        unit: 'P' + unit,
      };
    case value < 1_000_000_000_000_000_000_000:
      return {
        value: Math.floor(value / 1_000_000_000_000_000_000).toFixed(1),
        unit: 'H' + unit,
      };
    default:
      return { value: value.toFixed(1), unit };
  }
};
