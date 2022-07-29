import { AWS_HISTORICAL_MAX_MEMORY } from '../constants';
export enum Rules {
  NO_DEFAULT_MEMORY = 'NO_DEFAULT_MEMORY',
  LIGHT_BUNDLE = 'LIGHT_BUNDLE',
  LIMITED_AMOUNT_OF_LAMBDA_VERSIONS = 'LIMITED_AMOUNT_OF_LAMBDA_VERSIONS',
  NO_MAX_TIMEOUT = 'NO_MAX_TIMEOUT',
  NO_SHARED_IAM_ROLES = 'NO_SHARED_IAM_ROLES',
  USE_ARM_ARCHITECTURE = 'USE_ARM_ARCHITECTURE',
  UNDER_MAX_MEMORY = 'UNDER_MAX_MEMORY',
  NO_IDENTICAL_CODE = 'NO_IDENTICAL_CODE',
  INTELLIGENT_TIERING = 'INTELLIGENT_TIERING',
  ASYNC_SPECIFY_FAILURE_DESTINATION = 'ASYNC_NO_FAILURE_DESTINATION',
}

export const RuleDisplayNames = {
  [Rules.NO_DEFAULT_MEMORY]: 'Lambda: No Default Memory',
  [Rules.LIGHT_BUNDLE]: 'Lambda: Light Bundle',
  [Rules.LIMITED_AMOUNT_OF_LAMBDA_VERSIONS]:
    'Lambda: Limited Amount of Versions',
  [Rules.NO_MAX_TIMEOUT]: 'Lambda No Maximum Timeout',
  [Rules.NO_SHARED_IAM_ROLES]: 'Lambda: No Shared IAM Roles',
  [Rules.USE_ARM_ARCHITECTURE]: 'Lambda: Use an ARM Architecture',
  [Rules.UNDER_MAX_MEMORY]: 'Lambda: Under Maximum Memory',
  [Rules.USE_ARM_ARCHITECTURE]: 'Lambda: Use ARM Architecture',
  [Rules.NO_IDENTICAL_CODE]: 'Lambda: No Identical Code',
  [Rules.INTELLIGENT_TIERING]: 'S3: Use Intelligent Tiering',
  [Rules.ASYNC_SPECIFY_FAILURE_DESTINATION]:
    'Lambda: Specify Failure Destination for Async Functions',
} as const;

export const ErrorMessages = {
  [Rules.NO_DEFAULT_MEMORY]:
    'The following functions have their memory set as default.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/no-default-memory.md) for impact and how to resolve.',
  [Rules.LIGHT_BUNDLE]:
    'The following functions have bundles that weight more than 5 Mb.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/light-bundle.md) for impact and how to resolve.',
  [Rules.LIMITED_AMOUNT_OF_LAMBDA_VERSIONS]:
    'The following functions have an amount of deployed versions greater than 3.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/limited-amount-of-versions.md) for impact and how to resolve.',
  [Rules.NO_MAX_TIMEOUT]:
    'The following functions have their timeout set as the maximum.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/no-max-timeout.md) for impact and how to resolve.',
  [Rules.NO_SHARED_IAM_ROLES]:
    'The following functions have roles used by 1 or more other functions.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/no-shared-iam-roles.md) for impact and how to resolve.',
  [Rules.USE_ARM_ARCHITECTURE]:
    "The function's architecture is not set as ARM.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/use-arm.md) for impact and how to resolve.",
  [Rules.UNDER_MAX_MEMORY]: `The function's memory is set to the historical maximum limit of ${AWS_HISTORICAL_MAX_MEMORY} MB or higher.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/under-max-memory.md) for impact and how to resolve.`,
  [Rules.NO_IDENTICAL_CODE]:
    "The function's code is identical to other functions.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/no-identical-code.md) for impact and how to resolve.",
  [Rules.INTELLIGENT_TIERING]:
    'Intelligent Tiering is not enabled on this S3 bucket.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/use-intelligent-tiering.md) for impact and how to resolve.',
  [Rules.ASYNC_SPECIFY_FAILURE_DESTINATION]:
    'The function is asynchronous but has no failure destination set. See (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/async-specify-failure-destination.md) for impact and how to resolve.',
} as const;
