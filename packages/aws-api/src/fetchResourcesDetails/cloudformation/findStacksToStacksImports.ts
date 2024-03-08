import {
  CloudFormationClient,
  CloudFormationServiceException,
  Export,
  paginateListExports,
  paginateListImports,
} from '@aws-sdk/client-cloudformation';

import { CloudformationStackARN } from '@sls-mentor/arn';

import { listCloudformationStacks } from 'listAllResources/services/cloudformation/listStacks';

const findAllExportsFromCloudformation = async (): Promise<Export[]> => {
  const cloudformationExports: {
    ExportingStackId?: string;
    Name?: string;
    Value?: string;
  }[] = [];
  const cloudFormationClient = new CloudFormationClient({});
  for await (const page of paginateListExports(
    {
      client: cloudFormationClient,
    },
    {},
  )) {
    cloudformationExports.push(...(page.Exports ?? []));
  }

  return cloudformationExports;
};

const generateStackNameToStackArn = async (): Promise<
  Record<string, CloudformationStackARN>
> => {
  const cloudformationStacks = await listCloudformationStacks();

  const stackNameToStackArn: Record<string, CloudformationStackARN> = {};

  for (const { stackArn } of cloudformationStacks) {
    stackNameToStackArn[stackArn.getStackName()] = stackArn;
  }

  return stackNameToStackArn;
};

export const findStacksToStacksImports = async (): Promise<
  {
    exportingStack?: CloudformationStackARN;
    importingStack?: CloudformationStackARN;
  }[]
> => {
  const cloudformationImports: {
    exportStackArn: string;
    importStackName: string;
  }[] = [];
  const cloudFormationClient = new CloudFormationClient({});

  const allExports = await findAllExportsFromCloudformation();
  const stackNameToStackArn = await generateStackNameToStackArn();

  await Promise.all(
    allExports.map(async exportedValue => {
      try {
        if (exportedValue.Value !== undefined) {
          for await (const page of paginateListImports(
            {
              client: cloudFormationClient,
            },
            { ExportName: exportedValue.Name ?? '' },
          )) {
            cloudformationImports.push({
              exportStackArn: exportedValue.ExportingStackId ?? '',
              importStackName: page.Imports?.join('') ?? '',
            });
          }
        }

        return cloudformationImports;
      } catch (e) {
        if (e instanceof CloudFormationServiceException) {
          return undefined;
        }
        throw e;
      }
    }),
  );

  return cloudformationImports.map(stack => ({
    exportingStack: CloudformationStackARN.fromStackId(stack.exportStackArn),
    importingStack: stackNameToStackArn[stack.importStackName],
  }));
};
