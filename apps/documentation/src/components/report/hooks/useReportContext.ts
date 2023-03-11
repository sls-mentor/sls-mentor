import { createContext, useContext } from 'react';
import { SlsMentorLevel } from '@sls-mentor/core';
import { Results } from '../types';

export const ReportContext = createContext<
  | {
      level: SlsMentorLevel;
      results: Results;
    }
  | undefined
>(undefined);

export const useReportContext = (): {
  level: SlsMentorLevel;
  results: Results;
} => {
  const reportContext = useContext(ReportContext);

  if (reportContext === undefined) {
    throw new Error('Unexpected undefined context');
  }

  return reportContext;
};
