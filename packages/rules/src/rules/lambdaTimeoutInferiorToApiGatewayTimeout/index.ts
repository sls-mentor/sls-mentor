import {
  fetchAllApiGatewayV2Integrations,
  fetchAllLambdaConfigurations,
  fetchAllRestApiGatewayResources,
} from '@sls-mentor/aws-api';

import { Rule } from '../../types';

const SAFETY_MARGIN_MS = 1000;

const run: Rule['run'] = async resourceArns => {
  const lambdaInfos = (await fetchAllLambdaConfigurations(resourceArns)).map(
    ({ arn, configuration }) => ({
      arn,
      timeout: configuration.Timeout ?? 0,
    }),
  );

  const apiIntegrationsV2 = (
    await fetchAllApiGatewayV2Integrations(resourceArns)
  ).flatMap(({ targets }) => targets);

  const apiGatewaysV1 = await fetchAllRestApiGatewayResources(resourceArns);
  const apiIntegrationsV1 = apiGatewaysV1
    .flatMap(({ resources }) =>
      resources.flatMap(({ resourceMethods }) =>
        Object.values(resourceMethods ?? {}),
      ),
    )
    .map(({ methodIntegration }) => ({
      uri: methodIntegration?.uri ?? '',
      timeoutMs: methodIntegration?.timeoutInMillis ?? 0,
    }));

  const apiIntegrations = apiIntegrationsV2.concat(apiIntegrationsV1);

  const results = lambdaInfos.map(lambda => {
    const filteredIntegrations = apiIntegrations.filter(integration =>
      integration.uri.includes(lambda.arn.toString()),
    );
    if (filteredIntegrations.length === 0) {
      return {
        arn: lambda.arn,
        success: true,
      };
    }

    const integrationTimeoutMs = filteredIntegrations.reduce(
      (minTimeout, integration) => {
        if (integration.timeoutMs < minTimeout) {
          return integration.timeoutMs;
        }

        return minTimeout;
      },
      +Infinity,
    );

    return {
      arn: lambda.arn,
      success: lambda.timeout * 1000 + SAFETY_MARGIN_MS <= integrationTimeoutMs,
    };
  });

  return { results };
};

export const lambdaTimeoutInferiorToApiGatewayTimeout: Rule = {
  ruleName: 'Lambda: timeout inferior to API Gateway timeout',
  errorMessage: 'Lambda timeout should be inferior to API Gateway timeout',
  run,
  fileName: 'lambdaTimeoutInferiorToApiGatewayTimeout',
  categories: ['ITCosts'],
  level: 1,
  service: 'Lambda',
  easyToFix: true,
  severity: 'medium',
};
