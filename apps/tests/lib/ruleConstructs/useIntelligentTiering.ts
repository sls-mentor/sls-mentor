import { useIntelligentTiering as UseIntelligentTieringRule } from '@sls-mentor/core';
import { Duration } from 'aws-cdk-lib';
import { LifecycleRule, StorageClass } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { DefaultBucket } from '../common';

interface UseIntelligentTieringProps {
  lifecycleRules: LifecycleRule[];
}

export class UseIntelligentTiering extends Construct {
  static passTestCases: Record<string, UseIntelligentTieringProps> = {
    'O day transition to intelligent tiering': {
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
    },
  };

  static failTestCases: Record<string, UseIntelligentTieringProps> = {
    'No lifecycle rule': { lifecycleRules: [] },
  };

  constructor(
    scope: Construct,
    id: string,
    { lifecycleRules }: UseIntelligentTieringProps,
  ) {
    super(scope, id);
    const s3Bucket = new DefaultBucket(this, 'S3Bucket', {
      lifecycleRules,
    });
    s3Bucket.tagRule(UseIntelligentTieringRule);
  }
}
