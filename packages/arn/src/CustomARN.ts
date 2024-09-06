/* eslint-disable max-lines */
import { ARN, build, parse } from '@aws-sdk/util-arn-parser';

import {
  ArnPartition,
  ArnRegion,
  ArnService,
  isArnPartition,
  isArnRegion,
  isArnService,
  isValidAccountId,
} from './types';

// Used to pass CustomARN sub-classes as function parameter
type CustomARNSubClass<T extends CustomARN> = new (...args: string[]) => T;

/**
 * CustomARN class implementing the `ARN` interface.
 * **Setup the class using the static method `CustomARN.setup` before creating any instance.**
 * @param resource ARN resource
 * @param service ARN service
 */
export class CustomARN implements ARN {
  public partition: ArnPartition;
  public accountId: string;
  public region: ArnRegion;

  static setupPartition: ArnPartition | undefined = undefined;
  static setupAccountId: string | undefined = undefined;
  static setupRegion: ArnRegion | undefined = undefined;

  constructor(
    public resource: string,
    public service: ArnService,
  ) {
    const accountId = CustomARN.setupAccountId;
    const region = CustomARN.setupRegion;
    const partition = CustomARN.setupPartition;

    if (
      accountId === undefined ||
      region === undefined ||
      partition === undefined
    ) {
      throw new Error(
        'Static Method CustomARN.setup must be called before creating CustomARN instances',
      );
    }

    this.accountId = accountId;
    this.region = region;
    this.partition = partition;
  }

  /**
   * Checks if the ARN is equal to another ARN
   * @param otherArn ARN to compare to
   * @returns
   * `true` if the ARNs are equal
   * `false` if the ARNs are not equal
   * @example
   * const arnA = new CustomARN('my-resource', 'my-service');
   * const arnB = new CustomARN('my-resource', 'my-service');
   * const arnC = new CustomARN('my-other-resource', 'my-service');
   *
   * arnA.is(arnB); // true
   * arnA.is(arnC); // false
   */
  is = (otherArn: CustomARN | undefined): boolean =>
    otherArn !== undefined &&
    otherArn.accountId === this.accountId &&
    otherArn.partition === this.partition &&
    otherArn.region === this.region &&
    otherArn.resource === this.resource &&
    otherArn.service === this.service;

  /**
   * Checks if the ARN is equal to another ARN
   * @param arnA ARN to compare
   * @param arnB ARN to compare
   * @returns
   * `true` if the ARNs are equal
   * `false` if the ARNs are not equal
   * @example
   * const arnA = new CustomARN('my-resource', 'my-service');
   * const arnB = new CustomARN('my-resource', 'my-service');
   * const arnC = new CustomARN('my-other-resource', 'my-service');
   *
   * CustomARN.areARNsEqual(arnA, arnB); // true
   * CustomARN.areARNsEqual(arnA, arnC); // false
   */
  static areARNsEqual = (
    arnA: CustomARN,
    arnB: CustomARN | undefined,
  ): boolean => arnA.is(arnB);

  /**
   * Creates a CustomARN instance from a stringified version of the ARN
   * Warning: Will return `undefined` if the ARN is not supported
   * @param arnString stringified version of the ARN
   * @returns
   */
  static fromArnString = (arnString: string): CustomARN | undefined => {
    try {
      const parsedArn = parse(arnString);
      if (isArnService(parsedArn.service)) {
        return new CustomARN(parsedArn.resource, parsedArn.service);
      }

      return undefined;
    } catch (e) {
      return undefined;
    }
  };

  /**
   * Checks if the ARN is of a specific type
   * @param childClass CustomARN sub-class
   * @returns
   * `true` if the ARN is of the specified type
   * `false` if the ARN is not of the specified type
   * @example
   * const arnA = LambdaFunctionARN.fromFunctionName('my-function');
   * const arnB = S3BucketArn.fromBucketName('my-bucket');
   *
   * CustomARN.checkArnType(LambdaFunctionARN)(arnA); // true
   * CustomARN.checkArnType(LambdaFunctionARN)(arnB); // false
   */
  static checkArnType =
    <T extends CustomARN>(childClass: CustomARNSubClass<T>) =>
    (arn: CustomARN | undefined): arn is T =>
      arn instanceof childClass;

  /**
   * Filters an array of ARNs to keep only the ones of a specific type
   * @param arns array of ARNs
   * @param childClass CustomARN sub-class
   * @returns
   * Array of ARNs of the specified type
   * @example
   * const arnA = LambdaFunctionARN.fromFunctionName('my-function');
   * const arnB = S3BucketArn.fromBucketName('my-bucket');
   * const arnC = LambdaFunctionARN.fromFunctionName('my-other-function');
   *
   * CustomARN.filterArns([arnA, arnB, arnC], LambdaFunctionARN); // [arnA, arnC]
   * CustomARN.filterArns([arnA, arnB, arnC], S3BucketARN); // [arnB]
   */
  static filterArns = <T extends CustomARN>(
    arns: (CustomARN | undefined)[],
    childClass: CustomARNSubClass<T>,
  ): T[] => arns.filter(CustomARN.checkArnType(childClass));

  /**
   * Stringifies the ARN to the original ARN string format
   * @returns stringified version of the ARN
   * @example
   * CustomARN.setup({
   *  accountId: '123456789012',
   *  region: 'eu-west-1',
   *  partition: 'aws',
   * });
   * const lambdaFunctionArn = LambdaFunctionARN.fromFunctionName('my-function');
   * lambdaFunctionArn.toString(); // 'arn:aws:lambda:eu-west-1:123456789012:function:my-function';
   *
   * const s3BucketArn = S3BucketARN.fromBucketName('my-bucket');
   * s3BucketArn.toString(); // 'arn:aws:s3:eu-west-1:123456789012:my-bucket';
   */
  toString = (): string => build(this);

  /**
   * Sets up the CustomARN class to be used by the CustomARN class.
   * **Must be called before creating any CustomARN instance**
   * @param accountId AWS Account ID
   * @param region AWS Region
   * @param partition AWS Partition
   */
  static setup = ({
    accountId,
    region,
    partition = ArnPartition.aws,
  }: {
    accountId: string;
    region: string;
    partition?: string;
  }): void => {
    if (!isArnRegion(region)) {
      throw new Error(`Invalid region: ${region}`);
    }

    if (!isArnPartition(partition)) {
      throw new Error(`Invalid partition: ${partition}`);
    }

    if (!isValidAccountId(accountId)) {
      throw new Error(`Invalid account ID: ${accountId}`);
    }

    CustomARN.setupAccountId = accountId;
    CustomARN.setupRegion = region;
    CustomARN.setupPartition = partition;
  };
}
