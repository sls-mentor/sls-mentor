import { ARN, build, parse } from '@aws-sdk/util-arn-parser';

// Used to pass GuardianARN sub-classes as function parameter
type GuardianARNSubClass<T extends GuardianARN> = new (...args: string[]) => T;

export class GuardianARN implements ARN {
  public partition = 'aws';
  public accountId = process.env.ACCOUNT_ID as string;
  public region = process.env.AWS_REGION as string;

  constructor(public resource: string, public service: string) {}

  is = (otherArn: GuardianARN): boolean =>
    otherArn.accountId === this.accountId &&
    otherArn.partition === this.partition &&
    otherArn.region === this.region &&
    otherArn.resource === this.resource &&
    otherArn.service === this.service;

  static areARNsEqual = (arnA: GuardianARN, arnB: GuardianARN): boolean =>
    arnA.is(arnB);

  static fromArnString = (arnString: string): GuardianARN => {
    const parsedArn = parse(arnString);

    return new GuardianARN(parsedArn.resource, parsedArn.service);
  };

  static checkArnType =
    <T extends GuardianARN>(childClass: GuardianARNSubClass<T>) =>
    (arn: GuardianARN): arn is T =>
      arn instanceof childClass;

  static filterArns = <T extends GuardianARN>(
    arns: GuardianARN[],
    childClass: GuardianARNSubClass<T>,
  ): T[] => arns.filter(GuardianARN.checkArnType(childClass));

  toString = (): string => build(this);
}
