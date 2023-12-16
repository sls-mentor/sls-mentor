import { ARN, build, parse } from '@aws-sdk/util-arn-parser';

// Used to pass CustomARN sub-classes as function parameter
type CustomARNSubClass<T extends CustomARN> = new (...args: string[]) => T;

export class CustomARN implements ARN {
  public partition = 'aws';
  public accountId: string;
  public region: string;

  static setupAccountId: string | undefined = undefined;
  static setupRegion: string | undefined = undefined;

  constructor(
    public resource: string,
    public service: string,
  ) {
    const accountId = CustomARN.setupAccountId;
    const region = CustomARN.setupRegion;

    if (accountId === undefined || region === undefined) {
      throw new Error(
        'Static Method CustomARN.setup must be called before creating CustomARN instances',
      );
    }

    this.accountId = accountId;
    this.region = region;
  }

  is = (otherArn: CustomARN): boolean =>
    otherArn.accountId === this.accountId &&
    otherArn.partition === this.partition &&
    otherArn.region === this.region &&
    otherArn.resource === this.resource &&
    otherArn.service === this.service;

  static areARNsEqual = (arnA: CustomARN, arnB: CustomARN): boolean =>
    arnA.is(arnB);

  static fromArnString = (arnString: string): CustomARN => {
    const parsedArn = parse(arnString);

    return new CustomARN(parsedArn.resource, parsedArn.service);
  };

  static checkArnType =
    <T extends CustomARN>(childClass: CustomARNSubClass<T>) =>
    (arn: CustomARN): arn is T =>
      arn instanceof childClass;

  static filterArns = <T extends CustomARN>(
    arns: CustomARN[],
    childClass: CustomARNSubClass<T>,
  ): T[] => arns.filter(CustomARN.checkArnType(childClass));

  static filterIgnoredArns = <T extends CustomARN>(
    arns: T[],
    ignoredArnPatterns: string[],
  ): T[] =>
    arns.filter(
      arn =>
        ignoredArnPatterns.findIndex(ignoredPattern =>
          arn.toString().match(ignoredPattern),
        ) < 0,
    );

  toString = (): string => build(this);

  static setup = ({
    accountId,
    region,
  }: {
    accountId: string;
    region: string;
  }): void => {
    CustomARN.setupAccountId = accountId;
    CustomARN.setupRegion = region;
  };
}
