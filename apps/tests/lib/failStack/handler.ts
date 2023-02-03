// import big package to fail light bundle rule
import cdk from 'aws-cdk-lib';
import danfojs from 'danfojs';
import exceljs from 'exceljs';

export const main = async (): Promise<void> => {
  console.log(exceljs);
  console.log(cdk);
  console.log(danfojs);

  return Promise.resolve();
};
