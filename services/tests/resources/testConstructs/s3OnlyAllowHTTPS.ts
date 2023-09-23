import { Construct } from 'constructs';

import { s3OnlyAllowHTTPS as s3OnlyAllowHTTPSRule } from '@sls-mentor/rules';

import { DefaultBucket } from '../defaultConstructs';

interface S3OnlyAllowHTTPSProps {
  enforceSSL?: boolean;
}

export class S3OnlyAllowHTTPS extends Construct {
  static passTestCases: Record<string, S3OnlyAllowHTTPSProps> = {
    'ssl is enforced': {
      enforceSSL: true,
    },
  };

  static failTestCases: Record<string, S3OnlyAllowHTTPSProps> = {
    'ssl is not enforced': { enforceSSL: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { enforceSSL }: S3OnlyAllowHTTPSProps,
  ) {
    super(scope, id);
    const bucket = new DefaultBucket(this, 'S3Bucket', { enforceSSL });
    bucket.tagRule(s3OnlyAllowHTTPSRule);
  }
}
