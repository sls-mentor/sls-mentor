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

const toRootStackArn = async (): Promise<
  Record<string, CloudformationStackARN>
> => {
  const cloudformationStacks = await listCloudformationStacks();

  const stackNameToStackArn: Record<string, CloudformationStackARN> = {};

  for (const { stackArn, rootStackArn } of cloudformationStacks) {
    stackNameToStackArn[stackArn.getStackName()] = rootStackArn ?? stackArn;
  }

  return stackNameToStackArn;
};

const generateStackIdToRootStackId = async (): Promise<
  Record<string, string>
> => {
  const cloudformationStacks = await listCloudformationStacks();

  const stackIdToRootStackId: Record<string, string> = {};

  for (const { stackArn, rootStackArn } of cloudformationStacks) {
    const rootStackId = rootStackArn?.toString();
    if (rootStackId !== undefined) {
      stackIdToRootStackId[stackArn.toString()] = rootStackId;
    } else {
      stackIdToRootStackId[stackArn.toString()] = stackArn.toString();
    }
  }

  return stackIdToRootStackId;
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
  const stackNameToStackArn = await toRootStackArn();
  const stackIdToRootStackId = await generateStackIdToRootStackId();

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
            page.Imports?.forEach(importStackName => {
              cloudformationImports.push({
                exportStackArn: exportedValue.ExportingStackId ?? '',
                importStackName,
              });
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
    exportingStack: CloudformationStackARN.fromStackId(
      stackIdToRootStackId[stack.exportStackArn] ?? '',
    ),
    importingStack: stackNameToStackArn[stack.importStackName],
  }));
};
