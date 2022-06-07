export enum Rules {
  NO_DEFAULT_MEMORY = 'NO_DEFAULT_MEMORY',
  LIGHT_BUNDLE = 'LIGHT_BUNDLE',
  LIMITED_NUMBER_OF_LAMBDA_VERSIONS = 'LIMITED_NUMBER_OF_LAMBDA_VERSIONS',
  NO_DEFAULT_TIMEOUT = 'NO_DEFAULT_TIMEOUT',
  NO_MAX_TIMEOUT = 'NO_MAX_TIMEOUT',
  NO_SHARED_IAM_ROLES = 'NO_SHARED_IAM_ROLES',
  NO_ARM_ARCHITECTURE = 'NO_ARM_ARCHITECTURE',
}

export const RuleDisplayNames = {
  [Rules.NO_DEFAULT_MEMORY]: 'No default memory',
  [Rules.LIGHT_BUNDLE]: 'Light Bundle',
  [Rules.LIMITED_NUMBER_OF_LAMBDA_VERSIONS]:
    'Limited Number of Lambda Versions',
  [Rules.NO_DEFAULT_TIMEOUT]: 'No default timeout',
  [Rules.NO_MAX_TIMEOUT]: 'No max timeout',
  [Rules.NO_SHARED_IAM_ROLES]: 'No shared IAM roles',
  [Rules.NO_ARM_ARCHITECTURE]: 'Not using Arm Architecture',
};

export const ErrorMessages = {
  [Rules.NO_DEFAULT_MEMORY]:
    'The following functions have their memory set as default.',
  [Rules.LIGHT_BUNDLE]:
    'The following functions have bundles that weight more than 5 Mb.\nSee (https://m33.notion.site/Serverless-Sustainability-Audit-a36847289fd64339a60e40bc5aa63092) for impact.',
  [Rules.LIMITED_NUMBER_OF_LAMBDA_VERSIONS]:
    'The following functions have a number of deployed versions greater than 3',
  [Rules.NO_DEFAULT_TIMEOUT]:
    'The following functions have their timeout set as default.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-default-timeout) for impact and how to to resolve.',
  [Rules.NO_MAX_TIMEOUT]:
    'The following functions have their timeout set as the maximum.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-max-timeout) for impact and how to to resolve.',
  [Rules.NO_SHARED_IAM_ROLES]:
    'The following functions have roles used by 1 or more other functions.\nSee (https://theodo-uk.github.io/sls-dev-tools/docs/no-shared-roles) for impact and how to to resolve.',
  [Rules.NO_ARM_ARCHITECTURE]:
    "The function's architecture is not set as ARM. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/use-arm/use-arm.md) for impact and how to to resolve.",
};
