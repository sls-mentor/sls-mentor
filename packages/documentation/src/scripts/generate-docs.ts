import fs from 'fs';
import path from 'path';

import { allRules } from '@sls-mentor/rules';

if (fs.existsSync(path.join(__dirname, '../../docs/rules'))) {
  fs.rmSync(path.join(__dirname, '../../docs/rules'), { recursive: true });
}

fs.mkdirSync(path.join(__dirname, '../../docs/rules'));

const longestRuleName = allRules.reduce(
  (acc, { ruleName }) => Math.max(acc, ruleName.length),
  0,
);
const longestFileName = allRules.reduce(
  (acc, { fileName }) => Math.max(acc, fileName.length),
  0,
);

let tableOfRuleNames = `| Rule ${' '.repeat(
  longestRuleName - 4,
)}| Name for configuration file ${' '.repeat(longestFileName - 27)}|
| :${'-'.repeat(longestRuleName - 1)} | :${'-'.repeat(longestFileName - 1)} |`;

allRules.forEach(({ fileName, ruleName }) => {
  fs.copyFileSync(
    path.join(__dirname, '../../../rules/src/rules', fileName, 'doc.md'),
    path.join(__dirname, '../../docs/rules', fileName + '.md'),
  );
  tableOfRuleNames = `${tableOfRuleNames}
| ${ruleName} ${' '.repeat(
    longestRuleName - ruleName.length,
  )}| ${fileName} ${' '.repeat(longestFileName - fileName.length)}|`;
});

const data = fs.readFileSync(
  path.join(__dirname, './templates/configure-sls-mentor.md'),
  'utf-8',
);
const result = data.replace(
  /<!-- Rule table will appear here -->/g,
  tableOfRuleNames,
);
fs.writeFileSync(
  path.join(__dirname, '../../docs/set-up-sls-mentor/configure-sls-mentor.md'),
  result,
  'utf8',
);
