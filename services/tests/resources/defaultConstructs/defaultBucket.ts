import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  BucketProps,
  CfnBucket,
  StorageClass,
} from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { Rule } from '../rule';
import { RULE_TAG_KEY, Tagger } from '../tags';

export class DefaultBucket extends Bucket implements Tagger {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<BucketProps> | undefined = {},
  ) {
    super(
      scope,
      id,
      Object.assign<BucketProps, Partial<BucketProps>>(
        {
          encryption: BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
          lifecycleRules: [
            {
              transitions: [
                {
                  storageClass: StorageClass.INTELLIGENT_TIERING,
                  transitionAfter: Duration.days(0),
                },
              ],
            },
          ],
          removalPolicy: RemovalPolicy.DESTROY,
        },
        props,
      ),
    );
  }

  tagRule(rule: Rule): void {
    Tags.of(this.node.defaultChild as CfnBucket).add(
      RULE_TAG_KEY,
      rule.ruleName,
    );
  }
}
