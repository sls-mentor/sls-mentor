import { Stack } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { IBucket } from 'aws-cdk-lib/aws-s3';

const HOSTED_ZONE_ID = 'Z00145332XE1L4116FZ7M';
const HOSTED_ZONE_NAME = 'pchol.fr';
const DOMAIN_NAMES = ['www.sls-mentor.pchol.fr', 'sls-mentor.pchol.fr'];
const US_EAST_CERTIFICATE_ARN =
  'arn:aws:acm:us-east-1:361870595792:certificate/a7e52ce6-fff3-41b2-9346-7aa709852d39';

export const setupCloudfront = (stack: Stack, bucket: IBucket): void => {
  const distribution = new Distribution(
    stack,
    'DocumentationCloudfrontDistribution',
    {
      defaultBehavior: {
        origin: new S3Origin(bucket, {}),
      },
      domainNames: DOMAIN_NAMES,
      certificate: Certificate.fromCertificateArn(
        stack,
        'certificate',
        US_EAST_CERTIFICATE_ARN,
      ),
    },
  );

  const dnsHostedZone = HostedZone.fromHostedZoneAttributes(stack, 'dns', {
    hostedZoneId: HOSTED_ZONE_ID,
    zoneName: HOSTED_ZONE_NAME,
  });

  DOMAIN_NAMES.forEach(domainName => {
    new ARecord(stack, 'cloudfrontRedirect' + domainName, {
      zone: dnsHostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      recordName: domainName,
    });
  });
};
