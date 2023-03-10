import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

const PATHS = ['/*'];

const client = new CloudFrontClient({});

export const handler = async (): Promise<void> => {
  const distributionId = process.env.DISTRIBUTION_ID;

  if (distributionId === undefined) {
    throw new Error('DistributionId is undefined');
  }

  await client.send(
    new CreateInvalidationCommand({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: {
          Items: PATHS,
          Quantity: PATHS.length,
        },
      },
    }),
  );
};
