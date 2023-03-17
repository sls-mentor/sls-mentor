import { SlsMentorLevel } from '../constants';
import { CustomARN } from '../types/arn';
import { BaseConfiguration, RuleConfiguration } from './Configuration';

export const SEVERITY_LEVELS = ['critical', 'high', 'medium', 'low'] as const;
export type Severity = (typeof SEVERITY_LEVELS)[number];

export const CATEGORIES = [
  'GreenIT',
  'Stability',
  'Speed',
  'ITCosts',
  'Security',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const categoryNames: Record<Category, string> = {
  GreenIT: 'Sustainability',
  Stability: 'Stability',
  Speed: 'Speed',
  ITCosts: 'Savings',
  Security: 'Security',
};

export const SERVICES = [
  'Lambda',
  'S3',
  'CloudWatch',
  'CloudFront',
  'Cognito',
  'SQS',
  'EventBridge',
  'RDS',
  'Backup',
  'ApiGatewayV2',
] as const;
export type Service = (typeof SERVICES)[number];

export const serviceNames: Record<Service, string> = {
  Lambda: 'Lambda',
  S3: 'S3',
  CloudWatch: 'CloudWatch',
  CloudFront: 'CloudFront',
  Cognito: 'Cognito',
  SQS: 'SQS',
  EventBridge: 'EventBridge',
  RDS: 'RDS',
  Backup: 'Backup',
  ApiGatewayV2: 'Api Gateway V2',
};

export type RuleCheckResult = { arn: CustomARN; success: boolean } & Record<
  string,
  unknown
>;
export interface Rule<T extends RuleConfiguration = BaseConfiguration> {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (
    resources: CustomARN[],
    configuration?: T,
  ) => Promise<{
    results: RuleCheckResult[];
  }>;
  categories: Category[];
  level: SlsMentorLevel;
  service: Service;
  configurationTypeguard?: (config: unknown) => config is T;
  easyToFix: boolean;
  severity: Severity;
}
