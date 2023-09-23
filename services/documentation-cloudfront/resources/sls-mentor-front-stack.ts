import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { join } from 'path';

const HOSTED_ZONE_ID = 'Z075028229G4FKEZYST8V';
const HOSTED_ZONE_NAME = 'sls-mentor.dev';
const US_EAST_CERTIFICATE_ARN =
  'arn:aws:acm:us-east-1:885330630487:certificate/dcae66d1-8dea-40be-ba86-5eb8944bb0a7';
const US_EAST_DEV_CERTIFICATE_ARN =
  'arn:aws:acm:us-east-1:885330630487:certificate/7877837c-0583-4224-89b7-306816e4ed04';

export class SlsMentorFrontStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps & { stage: string },
  ) {
    super(scope, id, props);

    const { stage } = props;

    const bucket = new Bucket(this, 'StaticWebsiteHostingBucket', {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    const DOMAIN_NAMES = [
      `www.${stage === 'dev' ? 'dev.' : ''}sls-mentor.dev`,
      `${stage === 'dev' ? 'dev.' : ''}sls-mentor.dev`,
    ];

    const distribution = new Distribution(
      this,
      'DocumentationCloudfrontDistribution',
      {
        defaultBehavior: {
          origin: new S3Origin(bucket, {}),
        },
        domainNames: DOMAIN_NAMES,
        certificate: Certificate.fromCertificateArn(
          this,
          'certificate',
          stage === 'dev'
            ? US_EAST_DEV_CERTIFICATE_ARN
            : US_EAST_CERTIFICATE_ARN,
        ),
      },
    );

    const dnsHostedZone = HostedZone.fromHostedZoneAttributes(this, 'dns', {
      hostedZoneId: HOSTED_ZONE_ID,
      zoneName: HOSTED_ZONE_NAME,
    });

    DOMAIN_NAMES.forEach(domainName => {
      new ARecord(this, 'cloudfrontRedirect' + domainName, {
        zone: dnsHostedZone,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        recordName: domainName,
      });
    });

    new BucketDeployment(this, 'StaticWebsiteHostingDeployment', {
      sources: [
        Source.asset(join(__dirname, '../../../packages/documentation/dist')),
      ],
      destinationBucket: bucket,
      distribution,
    });
  }
}
