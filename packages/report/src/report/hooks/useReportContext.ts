import { createContext, useContext } from 'react';
import {
  PassingResourcesByCategory,
  PassingResourcesByRule,
} from '@sls-mentor/core';

export const ReportContext = createContext<
  | {
      passingResourcesByRule: PassingResourcesByRule;
      passingResourcesByCategory: PassingResourcesByCategory;
    }
  | undefined
>(undefined);

export const useReportContext = (): {
  passingResourcesByRule: PassingResourcesByRule;
  passingResourcesByCategory: PassingResourcesByCategory;
} => {
  const reportContext = useContext(ReportContext);

  if (reportContext === undefined) {
    throw new Error('Unexpected undefined context');
  }

  return reportContext;
};
