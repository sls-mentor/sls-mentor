import { SlsMentorLevel } from '@sls-mentor/core';
import { createContext, useContext } from 'react';
import { Results } from '../types';

export const ReportContext = createContext<
  | {
      level: SlsMentorLevel;
      results: Results;
      anonymizedAccountId: string;
    }
  | undefined
>(undefined);

export const useReportContext = (): {
  level: SlsMentorLevel;
  results: Results;
  anonymizedAccountId: string;
} => {
  const reportContext = useContext(ReportContext);

  if (reportContext === undefined) {
    throw new Error('Unexpected undefined context');
  }

  return reportContext;
};
