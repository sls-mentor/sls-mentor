import { Resource } from '../types';

export const filterLambdaFromResources = (resources: Resource[]): Resource[] =>
  resources.filter(({ arn }) => arn.service === 'lambda');
