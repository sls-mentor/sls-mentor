import { ARN, build, parse } from '@aws-sdk/util-arn-parser';

// Used to pass CustomARN sub-classes as function parameter
type CustomARNSubClass<T extends CustomARN> = new (...args: string[]) => T;

export class CustomARN implements ARN {
  public partition = 'aws';
  public accountId = process.env.AWS_ACCOUNT_ID as string;
  public region = process.env.AWS_REGION as string;

  constructor(public resource: string, public service: string) {}

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
}
