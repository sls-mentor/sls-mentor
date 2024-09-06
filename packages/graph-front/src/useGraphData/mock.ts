import {
  CloudFormationWarnings,
  LambdaFunctionNode,
  SerializedGraphData,
} from '@sls-mentor/graph-core';

export const mockResults2: SerializedGraphData = {
  nodes: {
    'arn:aws:s3:us-east-1:123456789012:example-1': {
      arn: 'arn:aws:s3:us-east-1:123456789012:example-1',
      stats: {},
      cloudformationStack: undefined,
      tags: {},
    },
    'arn:aws:s3:us-east-1:123456789012:example-2': {
      arn: 'arn:aws:s3:us-east-1:123456789012:example-1',
      stats: {},
      cloudformationStack: undefined,
      tags: {},
    },
    'arn:aws:s3:us-east-1:123456789012:example-3': {
      arn: 'arn:aws:s3:us-east-1:123456789012:example-1',
      stats: {},
      cloudformationStack: undefined,
      tags: {},
    },
    'arn:aws:s3:us-east-1:123456789012:example-4': {
      arn: 'arn:aws:s3:us-east-1:123456789012:example-1',
      stats: {},
      cloudformationStack: undefined,
      tags: {},
    },
    'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431':
      {
        arn: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431',
        stats: {},
        cloudformationStack: undefined,
        tags: {},
      },
    'arn:aws:cloudformation:us-east-1:123456789012:stack/Part09AuroraStack/0b67a460-b402-11ee-9879-02c30954b8f7':
      {
        arn: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part09AuroraStack/0b67a460-b402-11ee-9879-02c30954b8f7',
        stats: {},
        cloudformationStack: undefined,
        tags: {},
      },
  },
  edges: [
    {
      from: 'arn:aws:s3:us-east-1:123456789012:example-1',
      to: 'arn:aws:s3:us-east-1:123456789012:example-2',
      warnings: [],
    },
    {
      from: 'arn:aws:s3:us-east-1:123456789012:example-1',
      to: 'arn:aws:s3:us-east-1:123456789012:example-3',
      warnings: [],
    },
    {
      from: 'arn:aws:s3:us-east-1:123456789012:example-1',
      to: 'arn:aws:s3:us-east-1:123456789012:example-4',
      warnings: [],
    },
    {
      from: 'arn:aws:s3:us-east-1:123456789012:example-2',
      to: 'arn:aws:s3:us-east-1:123456789012:example-3',
      warnings: [],
    },
    {
      from: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part09AuroraStack/0b67a460-b402-11ee-9879-02c30954b8f7',
      to: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431',
      warnings: [CloudFormationWarnings.CircularDependencies],
    },
    {
      from: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431',
      to: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part09AuroraStack/0b67a460-b402-11ee-9879-02c30954b8f7',
      warnings: [CloudFormationWarnings.CircularDependencies],
    },
    {
      from: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431',
      to: 'arn:aws:cloudformation:us-east-1:123456789012:stack/Part08SQSStack/969a0fb0-b401-11ee-ba2a-0a809f902431',
      warnings: [CloudFormationWarnings.CircularDependencies],
    },
  ],
  tags: [
    {
      Key: 'tag-key-1',
      Value: 'tag-value-1',
    },
    {
      Key: 'tag-key-2',
      Value: 'tag-value-2',
    },
  ],
  cloudformationStacks: ['CloudFormationStack1', 'CloudFormationStack2'],
  vpcConfig: {
    vpcs: {},
    subnets: {},
  },
};

export const mockResults: SerializedGraphData = {
  nodes: Object.fromEntries(
    Object.entries({
      'arn:aws:s3:us-east-1:123456789012:example-advisor-dev-serverlessdeploymentbucket-192uxncrxkb7k':
        {
          arn: 'arn:aws:s3:us-east-1:123456789012:example-advisor-dev-serverlessdeploymentbucket-192uxncrxkb7k',
        },
      'arn:aws:s3:us-east-1:123456789012:example-facebook-dev-serverlessdeploymentbucket-plorpn1vgr86':
        {
          arn: 'arn:aws:s3:us-east-1:123456789012:example-facebook-dev-serverlessdeploymentbucket-plorpn1vgr86',
        },
      'arn:aws:s3:us-east-1:123456789012:example-authorization-de-serverlessdeploymentbuck-wk1zu2qhbgxq':
        {
          arn: 'arn:aws:s3:us-east-1:123456789012:example-authorization-de-serverlessdeploymentbuck-wk1zu2qhbgxq',
        },
      // 'arn:aws:s3:us-east-1:123456789012:example-client-dev-serverlessdeploymentbucket-17z37rtj5l1pz':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-client-dev-serverlessdeploymentbucket-17z37rtj5l1pz',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-contract-dev-serverlessdeploymentbucket-l828d10kopik':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-contract-dev-serverlessdeploymentbucket-l828d10kopik',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailbucket843a740f-w7l4mb25ihsw':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailbucket843a740f-w7l4mb25ihsw',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailtestbucket28902521-5h5wckacds5p':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailtestbucket28902521-5h5wckacds5p',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-filebucketcdfcd6de-1mscqd4k9ajrb':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-filebucketcdfcd6de-1mscqd4k9ajrb',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-serverlessdeploymentbucket-124enzjrdoxsw':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-serverlessdeploymentbucket-124enzjrdoxsw',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-testbucket560b80bc-m21mtdgulyzi':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-testbucket560b80bc-m21mtdgulyzi',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-testversionedbucketc2efb22d-r0h920zdmvlo':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-testversionedbucketc2efb22d-r0h920zdmvlo',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedtestbucket512ca11c-13jjng3e740zx':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedtestbucket512ca11c-13jjng3e740zx',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-amazon-dev-serverlessdeploymentbucket-16ms16744lfcc':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-amazon-dev-serverlessdeploymentbucket-16ms16744lfcc',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-google-dev-serverlessdeploymentbucket-1d69a3pt2x4s8':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-google-dev-serverlessdeploymentbucket-1d69a3pt2x4s8',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-signature-dev-serverlessdeploymentbucket-1n91d1q6o51fu':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-signature-dev-serverlessdeploymentbucket-1n91d1q6o51fu',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-microsoft-dev-serverlessdeploymentbucket-1009whoitzyw8':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-microsoft-dev-serverlessdeploymentbucket-1009whoitzyw8',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-template-documen-serverlessdeploymentbuck-1dmxkm0nq85yt':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-template-documen-serverlessdeploymentbuck-1dmxkm0nq85yt',
      //   },
      // 'arn:aws:s3:us-east-1:123456789012:example-user-dev-serverlessdeploymentbucket-1mvdqpth97t27':
      //   {
      //     arn: 'arn:aws:s3:us-east-1:123456789012:example-user-dev-serverlessdeploymentbucket-1mvdqpth97t27',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-chckPldPblshImprtEvt_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-chckPldPblshImprtEvt_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoClntIdsFrmJsn_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoClntIdsFrmJsn_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnOtherDocuments_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnOtherDocuments_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addexampleIdToOMContract':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addexampleIdToOMContract',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fillAdviceReportProof_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fillAdviceReportProof_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleFatca_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleFatca_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleDocsToSign_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleDocsToSign_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onProfileFormCompleted_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onProfileFormCompleted_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientUser_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientUser_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOprtSpprtsValidatio_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOprtSpprtsValidatio_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-OMUpdateOperationStatus_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-OMUpdateOperationStatus_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateAdvisor':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateAdvisor',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createNote_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createNote_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOrUpdateOMClient':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOrUpdateOMClient',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateQpiPdfForm':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateQpiPdfForm',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSupports_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSupports_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrOperation_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrOperation_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtUpdated_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtUpdated_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSubscription_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSubscription_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-dispatchPfloAnalysis':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-dispatchPfloAnalysis',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnSlip_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnSlip_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrtnrRltns_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrtnrRltns_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncProfileToC2i_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncProfileToC2i_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extConvertPrctsToClients_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extConvertPrctsToClients_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCgntoGrp':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCgntoGrp',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-internalUpdateSignature':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-internalUpdateSignature',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateRegDocSignatures_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateRegDocSignatures_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMContract':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMContract',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestCgpoJsonUrl':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestCgpoJsonUrl',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArtmsVieARPdfForm':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArtmsVieARPdfForm',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperationSupports_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperationSupports_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateProspectIntoClient':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateProspectIntoClient',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncQpiToC2i_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncQpiToC2i_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-archiveClient_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-archiveClient_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationSepaMandate_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationSepaMandate_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extSyncClient_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extSyncClient_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-mergeMicrosoftSupports':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-mergeMicrosoftSupports',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAlertActions':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAlertActions',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmsDownloadUrl':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmsDownloadUrl',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateOperationSignature_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateOperationSignature_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchPdfFormGnrtRqstd':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchPdfFormGnrtRqstd',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportWarningStatus_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportWarningStatus_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsByCategory':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsByCategory',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createRegDocSignature':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createRegDocSignature',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connectAuthorizer':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connectAuthorizer',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGCmplxPrdct_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGCmplxPrdct_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscriptionSignatur_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscriptionSignatur_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getAdvisor':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getAdvisor',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-genMergedPrecontractDoc':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-genMergedPrecontractDoc',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteClientUser_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteClientUser_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-genAlctnRiskRprt':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-genAlctnRiskRprt',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disableUser':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disableUser',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrCtct_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrCtct_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getMicrosoftProspectId_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getMicrosoftProspectId_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncPreValidationRequest':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncPreValidationRequest',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-saveFinancialReport':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-saveFinancialReport',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorUser':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorUser',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchAggregate':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchAggregate',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-createPflo':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-createPflo',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtSlipWithCpxPdcts':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtSlipWithCpxPdcts',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getamazonDocument':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getamazonDocument',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchDocsRegen_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchDocsRegen_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getQpi_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getQpi_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteAdvisorUser':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteAdvisorUser',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientsForSearch_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientsForSearch_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaClientIds_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaClientIds_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listAdvisors':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listAdvisors',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-assignOperator_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-assignOperator_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieDocsToSig_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieDocsToSig_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onQpiScoreComputed_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onQpiScoreComputed_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateSupportsInamazon':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateSupportsInamazon',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserDeleted_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserDeleted_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-setContractAuthorization':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-setContractAuthorization',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorCgntoUsr':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorCgntoUsr',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listOperators':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listOperators',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportDetails':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportDetails',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generatePSGARPdfForm':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generatePSGARPdfForm',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSignedDocuments_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSignedDocuments_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCognitoUser':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCognitoUser',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-assgnCgntoUsrToGrp':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-assgnCgntoUsrToGrp',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrntChldRltns_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrntChldRltns_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extGetSwagger_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extGetSwagger_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveOperationOnSigned_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveOperationOnSigned_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestAddedUploadUrl_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestAddedUploadUrl_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-resendTemporaryPassword':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-resendTemporaryPassword',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateMissionLetterPdfForm':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateMissionLetterPdfForm',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onGoingSignatureProjection_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onGoingSignatureProjection_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientCreated_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientCreated_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateFirm':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateFirm',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dangerousCleanData':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dangerousCleanData',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listPdfForms':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listPdfForms',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientDocUploadUrl_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientDocUploadUrl_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-searchOMSupportOrIndex':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-searchOMSupportOrIndex',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-OMArbitrationInProgress':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-OMArbitrationInProgress',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMClientPortfolio':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMClientPortfolio',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-contractEventFanout_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-contractEventFanout_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateQpi_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateQpi_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrOperation_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrOperation_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getOnGoingSignature_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getOnGoingSignature_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-updateAlert':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-updateAlert',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchUnversndFileUploaded':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchUnversndFileUploaded',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectOperation_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectOperation_',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listFirms':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listFirms',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updatePreValNetflixClbk':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updatePreValNetflixClbk',
      //   },
      // 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fetchGazpromVieSCPIAnnex_':
      //   {
      //     arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fetchGazpromVieSCPIAnnex_',
      //   },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftSbcptn':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftSbcptn',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-onGoingSbscptnSgnPjctn_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-onGoingSbscptnSgnPjctn_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-postAuthentication':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-postAuthentication',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preTokenGeneration':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preTokenGeneration',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMArbitration':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMArbitration',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-isClientCertified_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-isClientCertified_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForProfileProjection_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForProfileProjection_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationFatca_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationFatca_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGSepaMndtes':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGSepaMndtes',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectSubscription_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectSubscription_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSepaMandates_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSepaMandates_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getFormFields':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getFormFields',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-deletePreValidation':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-deletePreValidation',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchCombinedMngSupports':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchCombinedMngSupports',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-getCertificationStatus':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-getCertificationStatus',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-requestOMDocsGeneration':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-requestOMDocsGeneration',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateDerogatedRateCerti_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateDerogatedRateCerti_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-genOperationRiskMapPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-genOperationRiskMapPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-refreshToken':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-refreshToken',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoImportStateFunctions_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoImportStateFunctions_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrSubscriptio_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrSubscriptio_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-updatePflo':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-updatePflo',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGSpprtAnnex_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGSpprtAnnex_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchUcLoiPacte':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchUcLoiPacte',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-getTemplate':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-getTemplate',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateCertifNetflixClbk':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateCertifNetflixClbk',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorUser':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorUser',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getNestleSpclSprtAnxToGnr_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getNestleSpclSprtAnxToGnr_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateRicPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateRicPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-checkSynchronisation':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-checkSynchronisation',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-computeAnalysis':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-computeAnalysis',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedRegDocsOnS3':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedRegDocsOnS3',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestProductDocDwlUrl_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestProductDocDwlUrl_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtCreated_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtCreated_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-netflixIpsAuthorizer':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-netflixIpsAuthorizer',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-custom-resource-existing-s3':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-custom-resource-existing-s3',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-deleteSupportsInamazon':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-deleteSupportsInamazon',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-custom-resource-existing-s3':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-custom-resource-existing-s3',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncAdvisorToamazon':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncAdvisorToamazon',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchRefreshClientDocs':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchRefreshClientDocs',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmLogoUploadUrl':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmLogoUploadUrl',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsComparison':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsComparison',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-syncMicrosoftProspect':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-syncMicrosoftProspect',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genDerOnCltCreatedOrUpdated_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genDerOnCltCreatedOrUpdated_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-refreshComplexProductQuiz':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-refreshComplexProductQuiz',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientUpdated_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientUpdated_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAllocation':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAllocation',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createAdvisor':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createAdvisor',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-customMessage':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-customMessage',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientNotes_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientNotes_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateNestleeARPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateNestleeARPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClient_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClient_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedOperationDocs':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedOperationDocs',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOMContract':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOMContract',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientEventFanout':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientEventFanout',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getGazpromVieSCPIToFetch_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getGazpromVieSCPIToFetch_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateDerPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateDerPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSupport_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSupport_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createSbcrptnSignature':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createSbcrptnSignature',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateSubscription_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateSubscription_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGArbtrgMndte':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGArbtrgMndte',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedSbcrptnDocs':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedSbcrptnDocs',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-computePosition':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-computePosition',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-advisorMassImport':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-advisorMassImport',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-downloadAlibabaDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-downloadAlibabaDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-resetUserLoginAttempts':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-resetUserLoginAttempts',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-storePfloId':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-storePfloId',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genClientRiskMapping_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genClientRiskMapping_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getProductDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getProductDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchSyncMicrosoftPrspct_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchSyncMicrosoftPrspct_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientRelationship_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientRelationship_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-getCognitoUsers':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-getCognitoUsers',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAvailableFrPostalCodes_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAvailableFrPostalCodes_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSupportAnnexes_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSupportAnnexes_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateSignature':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateSignature',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-migrateOperatorsToRDS':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-migrateOperatorsToRDS',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateOperation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateOperation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnStarte_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnStarte_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-microsoftLegalDocProjectio_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-microsoftLegalDocProjectio_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrntChldRltns_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrntChldRltns_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preAuthentication':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preAuthentication',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-runMigrations':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-runMigrations',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateSubscription_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateSubscription_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncFirmToamazon':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncFirmToamazon',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-amazonLegalDocProjectio_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-amazonLegalDocProjectio_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connect':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connect',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteFiles':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteFiles',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestOpTempUploadUrl_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestOpTempUploadUrl_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateCgpoImportStatus_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateCgpoImportStatus_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disconnect':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disconnect',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-saveexampleCgpoIdsMapping_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-saveexampleCgpoIdsMapping_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserUpdated_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserUpdated_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArmdVieARPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArmdVieARPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-saveTemplate':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-saveTemplate',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateNote_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateNote_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-isAdvisorCertified':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-isAdvisorCertified',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnUpdate_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnUpdate_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrSubscription_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrSubscription_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientAddedDocuments_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientAddedDocuments_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genQpiOnQpiScoreComputed_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genQpiOnQpiScoreComputed_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createFirm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createFirm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchAggregate_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchAggregate_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArbtrgMandate_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArbtrgMandate_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-computeQpiScore_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-computeQpiScore_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrtnrRltns_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrtnrRltns_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGDocsToSign':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGDocsToSign',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnAdviceReport_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnAdviceReport_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-validateProfile_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-validateProfile_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftOprtn':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftOprtn',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormUploadUrl':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormUploadUrl',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-setClientAuthorization_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-setClientAuthorization_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-reassignClient_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-reassignClient_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genMissionLetter_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genMissionLetter_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchFreeMngSupports':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchFreeMngSupports',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportErrorStatus_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportErrorStatus_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForQpiProjection_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForQpiProjection_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchVersndFileUploaded':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchVersndFileUploaded',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genCmplxPrdct_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genCmplxPrdct_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getFinancialReports_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getFinancialReports_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-initPfloAnalysis':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-initPfloAnalysis',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addSupportInAllocation':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addSupportInAllocation',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-globalSearch':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-globalSearch',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-health':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-health',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateClntRskMppngPdfForm':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateClntRskMppngPdfForm',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateProgressiveInvest_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateProgressiveInvest_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrDocumentsToSig_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrDocumentsToSig_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormDownloadUrl':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormDownloadUrl',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserCreated_':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserCreated_',
        },
      'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGContract':
        {
          arn: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGContract',
        },
      'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadDLQ2788F99A-qRDfoiz2BPQk.fifo':
        {
          arn: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadDLQ2788F99A-qRDfoiz2BPQk.fifo',
        },
      'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo':
        {
          arn: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo',
        },
      'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS':
        {
          arn: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
        },
      'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE':
        {
          arn: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE',
        },
      'arn:aws:sqs:us-east-1:123456789012:dev-advisor-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-advisor-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-facebook-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-facebook-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-client-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-client-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-contract-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-contract-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-core-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-core-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-amazon-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-amazon-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-signature-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-signature-testing-queue',
      },
      'arn:aws:sqs:us-east-1:123456789012:dev-microsoft-testing-queue': {
        arn: 'arn:aws:sqs:us-east-1:123456789012:dev-microsoft-testing-queue',
      },
      'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg':
        {
          arn: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
        },
      'arn:aws:events:us-east-1:123456789012:event-bus/default': {
        arn: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      },
      'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev': {
        arn: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      },
      'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev':
        {
          arn: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
        },
      'arn:aws:apigateway:us-east-1:123456789012:/apis/8k2y9mfcc7': {
        arn: 'arn:aws:apigateway:us-east-1:123456789012:/apis/8k2y9mfcc7',
      },
      'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf': {
        arn: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      },
      'arn:aws:ses:us-east-1:123456789012:identity/dev-pchol.orion-example.fr':
        {
          arn: 'arn:aws:ses:us-east-1:123456789012:identity/dev-pchol.orion-example.fr',
        },
      'arn:aws:ses:us-east-1:123456789012:identity/example@gmail.com': {
        arn: 'arn:aws:ses:us-east-1:123456789012:identity/example@gmail.com',
      },
      'arn:aws:ses:us-east-1:123456789012:configuration/ConfigurationSet3DD38186-irsFAZfzebh12':
        {
          arn: 'arn:aws:ses:us-east-1:123456789012:configuration/ConfigurationSet3DD38186-irsFAZfzebh12',
        },
      'arn:aws:apigateway:us-east-1:123456789012:/restapis/8ylodsz7k7': {
        arn: 'arn:aws:apigateway:us-east-1:123456789012:/restapis/8ylodsz7k7',
      },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleFacebookTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleFacebookTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleTestContractEventsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleTestContractEventsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/exampleTestEventsTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleTestEventsTable-dev',
        },
      'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev':
        {
          arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
        },
      'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4':
        {
          arn: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
        },
    }).map(([key, value]) => {
      if (key.startsWith('arn:aws:lambda')) {
        const stats: LambdaFunctionNode['stats'] = {
          configuration: {
            memorySize: Math.floor(Math.random() * 1000),
            timeout: Math.floor(Math.random() * 1000),
            bundleSize: Math.floor(Math.random() * 1000),
          },
          execution: {
            averageDuration: Math.floor(Math.random() * 1000),
            averageMemoryUsed: Math.floor(Math.random() * 1000),
            percentageMemoryUsed: Math.floor(Math.random() * 1000),
            maxDuration: Math.floor(Math.random() * 1000),
          },
          coldStarts: {
            coldStartPercentage: Math.floor(Math.random() * 1000),
            averageDuration: Math.floor(Math.random() * 1000),
            maxDuration: Math.floor(Math.random() * 1000),
          },
        };
        const random = Math.random();
        return [
          key,
          {
            ...value,
            stats,
            cloudformationStack: random > 0.5 ? 'stack-1' : 'stack-2',
            tags:
              Math.random() > 0.5
                ? { 'tag-key': 'tag-value-1' }
                : { 'tag-key': 'tag-value-2' },
            vpcConfig:
              Math.random() > 0.5
                ? {
                    VpcId: 'vpc-1',
                    SecurityGroupIds:
                      random > 0.3
                        ? random > 0.6
                          ? ['sg-1', 'sg-2']
                          : ['sg-2']
                        : ['sg-1'],
                  }
                : {
                    VpcId: 'vpc-2',
                    SecurityGroupIds:
                      random > 0.3
                        ? random > 0.6
                          ? ['sg-3', 'sg-4']
                          : ['sg-4']
                        : ['sg-3'],
                  },
          },
        ];
      }

      return [
        key,
        {
          ...value,
          stats: {},
          cloudformationStack: Math.random() > 0.5 ? 'stack-1' : 'stack-2',
          tags:
            Math.random() > 0.5
              ? { 'tag-key': 'tag-value-1' }
              : { 'tag-key': 'tag-value-2' },
        },
      ];
    }),
  ),
  edges: [
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-chckPldPblshImprtEvt_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-chckPldPblshImprtEvt_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-chckPldPblshImprtEvt_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoClntIdsFrmJsn_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoClntIdsFrmJsn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnOtherDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnOtherDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addexampleIdToOMContract',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fillAdviceReportProof_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fillAdviceReportProof_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fillAdviceReportProof_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleFatca_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleFatca_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleDocsToSign_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onProfileFormCompleted_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOprtSpprtsValidatio_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOprtSpprtsValidatio_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieAllocAnne_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-OMUpdateOperationStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-OMUpdateOperationStatus_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateAdvisor',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateAdvisor',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOrUpdateOMClient',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateQpiPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateQpiPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSupports_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtUpdated_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailbucket843a740f-w7l4mb25ihsw',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-processValidationEmail',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-dispatchPfloAnalysis',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnSlip_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnSlip_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrtnrRltns_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrtnrRltns_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFATCA_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncProfileToC2i_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extConvertPrctsToClients_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCgntoGrp',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCgntoGrp',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCgntoGrp',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-internalUpdateSignature',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-internalUpdateSignature',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateRegDocSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMContract',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestCgpoJsonUrl',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestCgpoJsonUrl',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFATCA_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArtmsVieARPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArtmsVieARPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperationSupports_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperationSupports_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateProspectIntoClient',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncQpiToC2i_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-archiveClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-archiveClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationSepaMandate_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationSepaMandate_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extSyncClient_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extSyncClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-runMigrations',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmsDownloadUrl',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateOperationSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchPdfFormGnrtRqstd',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchPdfFormGnrtRqstd',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportWarningStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createRegDocSignature',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connectAuthorizer',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGCmplxPrdct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGCmplxPrdct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGCmplxPrdct_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscriptionSignatur_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getAdvisor',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-genMergedPrecontractDoc',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-genAlctnRiskRprt',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disableUser',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disableUser',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disableUser',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrCtct_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrCtct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrCtct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getMicrosoftProspectId_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getMicrosoftProspectId_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncPreValidationRequest',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-saveFinancialReport',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-saveFinancialReport',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorUser',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchAggregate',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchAggregate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtSlipWithCpxPdcts',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtSlipWithCpxPdcts',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getamazonDocument',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchDocsRegen_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchDocsRegen_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getQpi_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getQpi_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteAdvisorUser',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteAdvisorUser',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteAdvisorUser',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_',
      warnings: [],
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientsForSearch_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaClientIds_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listAdvisors',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-assignOperator_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateOprtAthmsVieFIC_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArthmsVieDocsToSig_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onQpiScoreComputed_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateSupportsInamazon',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserDeleted_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserDeleted_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-setContractAuthorization',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-setContractAuthorization',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createOperatorCgntoUsr',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listOperators',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generatePSGARPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generatePSGARPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSignedDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCognitoUser',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCognitoUser',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-assgnCgntoUsrToGrp',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrntChldRltns_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-aggregateClntPrntChldRltns_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extGetSwagger_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-extGetSwagger_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveOperationOnSigned_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestAddedUploadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestAddedUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-resendTemporaryPassword',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-resendTemporaryPassword',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateMissionLetterPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateMissionLetterPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onGoingSignatureProjection_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onGoingSignatureProjection_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientCreated_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateFirm',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateFirm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dangerousCleanData',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dangerousCleanData',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dangerousCleanData',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listPdfForms',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientDocUploadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientDocUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-OMArbitrationInProgress',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMClientPortfolio',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-contractEventFanout_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateQpi_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateQpi_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getOnGoingSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getOnGoingSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchUnversndFileUploaded',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchUnversndFileUploaded',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listFirms',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updatePreValNetflixClbk',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-fetchGazpromVieSCPIAnnex_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftSbcptn',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftSbcptn',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-onGoingSbscptnSgnPjctn_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-onGoingSbscptnSgnPjctn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-postAuthentication',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preTokenGeneration',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-isClientCertified_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-isClientCertified_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForProfileProjection_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationFatca_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationFatca_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGSepaMndtes',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGSepaMndtes',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGSepaMndtes',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSepaMandates_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSepaMandates_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSepaMandates_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getFormFields',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-deletePreValidation',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchCombinedMngSupports',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-getCertificationStatus',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-getCertificationStatus',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-requestOMDocsGeneration',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-requestOMDocsGeneration',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateDerogatedRateCerti_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateDerogatedRateCerti_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateDerogatedRateCerti_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-genOperationRiskMapPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-genOperationRiskMapPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoImportStateFunctions_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoImportStateFunctions_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrSubscriptio_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genPSGSpprtAnnex_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchUcLoiPacte',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-getTemplate',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-getTemplate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorUser',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateRicPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateRicPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-checkSynchronisation',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedRegDocsOnS3',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedRegDocsOnS3',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestProductDocDwlUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtCreated_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-netflixIpsAuthorizer',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-custom-resource-existing-s3',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-custom-resource-existing-s3',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-deleteSupportsInamazon',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-custom-resource-existing-s3',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-emailbucket843a740f-w7l4mb25ihsw',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncAdvisorToamazon',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleSpclSprtAnx_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchRefreshClientDocs',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchRefreshClientDocs',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmLogoUploadUrl',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-syncMicrosoftProspect',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genDerOnCltCreatedOrUpdated_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genDerOnCltCreatedOrUpdated_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-refreshComplexProductQuiz',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-refreshComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientUpdated_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAllocation',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createAdvisor',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createAdvisor',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientNotes_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientNotes_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateNestleeARPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateNestleeARPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedOperationDocs',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOMContract',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientEventFanout',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateDerPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateDerPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSupport_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createSbcrptnSignature',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genScheduledAllocAnnex_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGArbtrgMndte',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGArbtrgMndte',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGArbtrgMndte',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedSbcrptnDocs',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-computePosition',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-advisorMassImport',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-advisorMassImport',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-advisorMassImport',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-downloadAlibabaDocuments_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-downloadAlibabaDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-downloadAlibabaDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-runMigrations_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-resetUserLoginAttempts',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-storePfloId',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleFacebookTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genClientRiskMapping_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getProductDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchSyncMicrosoftPrspct_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchSyncMicrosoftPrspct_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientRelationship_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-getCognitoUsers',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-getCognitoUsers',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAvailableFrPostalCodes_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAvailableFrPostalCodes_',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSupportAnnexes_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateSignature',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateSignature',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-runMigrations',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-migrateOperatorsToRDS',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-migrateOperatorsToRDS',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnStarte_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-microsoftLegalDocProjectio_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrntChldRltns_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preAuthentication',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreUserTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-preAuthentication',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-disableUserQueue982B26C7-LiN5tIa93MsE',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-runMigrations',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-runMigrations',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleSignatureTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncFirmToamazon',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-core-dev-deadLetterQueue3F848E28-QiWRykbETBUS',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-amazonLegalDocProjectio_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-connect',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteFiles',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteFiles',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestOpTempUploadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestOpTempUploadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateCgpoImportStatus_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateCgpoImportStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-disconnect',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-saveexampleCgpoIdsMapping_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-saveexampleCgpoIdsMapping_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserUpdated_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserUpdated_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArmdVieARPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateArmdVieARPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-saveTemplate',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-saveTemplate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientSingleTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateNote_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-isAdvisorCertified',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnUpdate_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrSubscription_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientAddedDocuments_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientAddedDocuments_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genQpiOnQpiScoreComputed_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createFirm',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createFirm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateGazpromVieContrac_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchAggregate_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchAggregate_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArbtrgMandate_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArbtrgMandate_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateArbtrgMandate_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-computeQpiScore_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-computeQpiScore_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-trsctWriteCltPrtnrRltns_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGDocsToSign',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGDocsToSign',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnAdviceReport_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadOprtnAdviceReport_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreMigrationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-runMigrations_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-validateProfile_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-validateProfile_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftOprtn',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftOprtn',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleCoreRealtimeTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendOperationSignedMessage_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormUploadUrl',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormUploadUrl',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-setClientAuthorization_',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-setClientAuthorization_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-reassignClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-reassignClient_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genMissionLetter_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchFreeMngSupports',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleMicrosoftTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-putCgpoImportErrorStatus_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientAlibabaMigrationTechnicalTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateNestleCtct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForQpiProjection_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchVersndFileUploaded',
      to: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-dispatchVersndFileUploaded',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genCmplxPrdct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genCmplxPrdct_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genCmplxPrdct_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getFinancialReports_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getFinancialReports_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-facebook-dev-initPfloAnalysis',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleFacebookTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addSupportInAllocation',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-globalSearch',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-health',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateClntRskMppngPdfForm',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-generateClntRskMppngPdfForm',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateProgressiveInvest_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateProgressiveInvest_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateProgressiveInvest_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrDocumentsToSig_',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateSvnrDocumentsToSig_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-versionedfilebucketf1777025-abc3fdzcez9i',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate',
      to: 'arn:aws:rds:us-east-1:123456789012:cluster:example-core-dev-auroracluster-4oifvjhzbgl4',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormDownloadUrl',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserCreated_',
      to: 'arn:aws:cognito-idp:us-east-1:123456789012:userpool/us-east-1_7Bp123dzvg',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserCreated_',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/example-AuthorizationTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGContract',
      to: 'arn:aws:s3:us-east-1:123456789012:example-core-dev-unversionedfilebucket4b15d6a0-1n9drmjeu6bvo',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGContract',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleClientProjectionsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-gnrtPSGContract',
      to: 'arn:aws:dynamodb:us-east-1:123456789012:table/exampleContractEventsTable-dev',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestCgpoJsonUrl',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-internalUpdateSignature',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestSbcrptnSignatures_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-archiveClient_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmLogoUploadUrl',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOpRiskMappingDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-copyPartnerRegulatoryDoc_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientDocUploadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getRegulatoryDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createAdvisor',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-OMArbitrationInProgress',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteClientUser_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperations_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestDocDownloadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-getAdvisor',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormDownloadUrl',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-assignOperator_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientUserStatus_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listPdfForms',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenSbcrptn_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientsForSearch_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-submitComplexProductQuiz',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestClientDocUploadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOprtSpprtsValidatio_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClient_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listOperators',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestProductDocDwlUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMContract',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getQpi_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateSignature',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOnGoingSbscptnSgn_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-computeQpiScore_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestOpTempUploadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-createFirm',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updateCertifNetflixClbk',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-startOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateQpi_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-reqInitialAllocValidation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClient_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSupport_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestRegDocSignatures_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-health',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-enableUser',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-globalSearch',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrSubscriptio_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveHandWrittenOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-enableClientUser_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-saveTemplate',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-isClientCertified_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getCgpoImportStateFunctions_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-computePosition',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getProductDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMArbitration',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-saveFinancialReport',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientUser_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-deleteNote_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidatePrvdrOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-resendTemporaryPassword',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportDetails',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-isAdvisorCertified',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createNote_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-createAdvisorCognitoUser',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMClientPortfolio',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-updateAlert',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestOperationSignature_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-requestOMDocsGeneration',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAlertActions',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getAllocation',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsComparison',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-compileTemplate',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listFirms',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractActsForSearch_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateFirm',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestFirmsDownloadUrl',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestPreValidation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-updatePreValNetflixClbk',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientRelationship_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncNetflixCertificate',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getOnGoingSignature_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-updateAdvisor',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getMicrosoftProspectId_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-getComplexProductQuiz',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAlibabaDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validatePrvdrOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-template-document-dev-getTemplate',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-createClientUser_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-searchOMSupportOrIndex',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getFinancialReports_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getamazonDocument',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-createContract_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-user-dev-getCognitoUsers',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateNote_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-validateProfile_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-getOMSupportsByCategory',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-getCertificationStatus',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-listAdvisors',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getAvailableFrPostalCodes_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-resendCltTmpPassword_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-requestPdfFormUploadUrl',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestAddedUploadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscriptionSignedDocs_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientAddedDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestStndlnCrtfctUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClient_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-getClientNotes_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getOperationSignedDocs_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSupports_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-reassignClient_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-requestDocDownloadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-requestClientNoteUploadUrl_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getContractSignedDocs_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-invalidateOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:apigateway:us-east-1:123456789012:/apis/fnjzfh86fejf',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addSupportInAllocation',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-health',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-refreshToken',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchCombinedMngSupports',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchFreeMngSupports',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-fetchUcLoiPacte',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/default',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-genMergedPrecontractDoc',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-dispatchPdfFormGnrtRqstd',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncAdvisorToamazon',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-advisor-dev-syncFirmToamazon',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForProfileProjection_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-clientForQpiProjection_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientCreated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-cltFrSearchOnClientUpdated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-dispatchAggregate',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genClientRiskMapping_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genDerOnCltCreatedOrUpdated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genMissionLetter_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-genQpiOnQpiScoreComputed_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generatePartnerRic_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-generateRic_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserCreated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserDeleted_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onClientUserUpdated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onGoingSignatureProjection_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onProfileFormCompleted_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-onQpiScoreComputed_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-sendMessage_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-setClientAuthorization_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncProfileToC2i_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-syncQpiToC2i_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateClientViaRelationship_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-client-dev-updateRegDocSignatures_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftOprtn',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-autoValidateMicrosoftSbcptn',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtCreated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnCtUpdated_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnStarte_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-ctActFrSearchOnOprtnUpdate_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-deleteSignedDocuments_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchAggregate_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-dispatchDocsRegen_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-amazonLegalDocProjectio_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-OMUpdateOperationStatus_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genOperationRiskMapping_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-genSubscriptionRiskMapping_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-generateAdvRprt_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-getSubInitAllocAnalysis',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-onGoingSbscptnSgnPjctn_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectOperation_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-projectSubscription_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveOperationOnSigned_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-saveSbcrptnOnSigned_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-sendMessage_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-setContractAuthorization',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-microsoftLegalDocProjectio_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-updateSubscriptionSignatur_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromOprtnZipSftp_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-uploadGazpromSbcptnZipSft_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-contract-dev-validateOperationSupports_',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-deleteFiles',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-core-dev-resetUserLoginAttempts',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-addexampleIdToOMContract',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOMContract',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-createOrUpdateOMClient',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-generateOMDocuments',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-amazon-dev-sendMessage',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createRegDocSignature',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-createSbcrptnSignature',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-deletePreValidation',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-syncPreValidationRequest',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedOperationDocs',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedRegDocsOnS3',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-signature-dev-uploadSignedSbcrptnDocs',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-createProspect',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-syncMicrosoftProspect',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClient',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateClientOnSubValid',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/exampleEventBus-dev',
      to: 'arn:aws:lambda:us-east-1:123456789012:function:example-microsoft-dev-updateProspectIntoClient',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-advisor-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-facebook-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-client-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-contract-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-core-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-amazon-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-signature-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:events:us-east-1:123456789012:event-bus/TestexampleEventBus-dev',
      to: 'arn:aws:sqs:us-east-1:123456789012:dev-microsoft-testing-queue',
      warnings: [],
    },
    {
      from: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadQueue40C425D8-9DgLu6lZf0Xi.fifo',
      to: 'arn:aws:sqs:us-east-1:123456789012:example-client-dev-AlibabaDocumentDownloadDLQ2788F99A-qRDfoiz2BPQk.fifo',
      warnings: [],
    },
  ],
  tags: [
    {
      Key: 'tag-key-1',
      Value: 'tag-value-1',
    },
    {
      Key: 'tag-key-2',
      Value: 'tag-value-2',
    },
  ],
  cloudformationStacks: ['CloudFormationStack1', 'CloudFormationStack2'],
  vpcConfig: {
    vpcs: {},
    subnets: {},
  },
};
