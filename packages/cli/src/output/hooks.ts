import chalk from 'chalk';
import { Spinner } from 'cli-spinner';

import { RunSlsMentorHooks } from '@sls-mentor/core';
import { Rule } from '@sls-mentor/rules';

import { LILA_HEX } from 'utils';

const SPINNER_STRING = '⠇⠋⠙⠸⠴⠦';

const getRulesSpinnerString = (doneRules: number, totalRules: number) =>
  chalk.hex(LILA_HEX)(`%s Processing rules (${doneRules}/${totalRules})...`);

export const getHooks = (): RunSlsMentorHooks => {
  const credentialsSpinner = new Spinner({
    text: chalk.hex(LILA_HEX)('%s Connecting to AWS...'),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  credentialsSpinner.setSpinnerString(SPINNER_STRING);

  const fetchAllResourcesSpinner = new Spinner({
    text: chalk.hex(LILA_HEX)('%s Fetching resources...'),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  fetchAllResourcesSpinner.setSpinnerString(SPINNER_STRING);

  const rulesSpinner = new Spinner({
    text: chalk.hex(LILA_HEX)('%s Processing rules...'),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  rulesSpinner.setSpinnerString(SPINNER_STRING);

  let doneRules = 0;
  let totalRules = 0;

  return {
    beforeSetupCredentials: () => {
      credentialsSpinner.start();
    },
    afterSetupCredentials: () => {
      credentialsSpinner.stop(true);
    },
    beforeFetchAllResources: () => {
      fetchAllResourcesSpinner.start();
    },
    afterFetchAllResources: () => {
      fetchAllResourcesSpinner.stop(true);
    },
    beforeAllRules: (rules: Rule[]) => {
      rulesSpinner.start();
      totalRules = rules.length;

      rulesSpinner.setSpinnerTitle(
        getRulesSpinnerString(doneRules, totalRules),
      );
    },
    afterAllRules: () => {
      rulesSpinner.stop(true);
    },
    afterEachRule: () => {
      doneRules += 1;

      rulesSpinner.setSpinnerTitle(
        getRulesSpinnerString(doneRules, totalRules),
      );
    },
  };
};
