export const getCompleteRuleErrorMessage = (
  specificMessage: string,
  fileName: string,
): string =>
  `${specificMessage}.\nSee (https://github.com/sls-mentor/sls-mentor/blob/master/src/rules/${fileName}/${fileName}.md) for impact and how to resolve.`;
