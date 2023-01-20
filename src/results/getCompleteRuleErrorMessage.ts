export const getCompleteRuleErrorMessage = (
  specificMessage: string,
  fileName: string,
): string =>
  `${specificMessage}.\nSee (https://www.sls-mentor.dev/docs/rules/${fileName}) for impact and how to resolve.`;
