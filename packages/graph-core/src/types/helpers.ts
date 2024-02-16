import { SupportedARN } from '@sls-mentor/arn';

export type NodeBase<
  T extends SupportedARN,
  S extends Record<string, unknown> = Record<string, unknown>,
> = {
  arn: T;
  stats: S;
  cloudformationStack: string | undefined;
};

export type SerializedNodeBase<
  S extends Record<string, unknown> = Record<string, unknown>,
> = {
  arn: string;
  stats: S;
  cloudformationStack: string | undefined;
};
