import { createContext, useContext } from 'react';
import { RuleResults, SlsMentorLevel } from '@sls-mentor/core';

export const ReportContext = createContext<
  | {
      level: SlsMentorLevel;
      results: RuleResults;
    }
  | undefined
>(undefined);

export const useReportContext = (): {
  level: SlsMentorLevel;
  results: RuleResults;
} => {
  const reportContext = useContext(ReportContext);

  if (reportContext === undefined) {
    throw new Error('Unexpected undefined context');
  }

  return reportContext;
};
