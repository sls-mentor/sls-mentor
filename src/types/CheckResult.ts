import { Rule } from './Rule';

export type CheckResult = { arn: string; success: boolean } & Record<
  string,
  unknown
>;

export type ChecksResults = {
  rule: Rule;
  result: CheckResult[];
}[];

export type FailedRule = {
  rule: Rule;
  extras: Record<string, unknown>;
};

export type ResourceResult = {
  resourceArn: string;
  failedRules: FailedRule[];
};
