import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const prompt = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rulesDirectory = path.join(__dirname, '../packages/rules/src/rules');
const testConstructsDirectory = path.join(
  __dirname,
  '../services/tests/resources/testConstructs',
);

prompt.question('Name of the new rule?\n-> ', ruleName => {
  if (typeof ruleName !== 'string') {
    throw new Error('Rule name must be a string');
  }

  fs.mkdirSync(path.join(rulesDirectory, ruleName));

  fs.writeFileSync(
    path.join(rulesDirectory, ruleName, 'index.ts'),
    `import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  await Promise.resolve(resourceArns); // Delete this line

  return { results: [] };
};

export const ${ruleName}: Rule = {
  ruleName: '${ruleName}', // Change to display name of rule
  errorMessage: '<Displayed error message>',
  run,
  fileName: '${ruleName}', // Do not change
  categories: ['GreenIT'], // Set categories related to rule
  level: 3, // Set level related to rule
  service: 'Lambda', // Set service related to rule
  easyToFix: false, // is it easy to fix non-complying resources?
  severity: 'medium', // what are the impacts of the problem solved by the rule?
};
`,
  );

  fs.appendFileSync(
    path.join(rulesDirectory, 'index.ts'),
    `export * from './${ruleName}';\n`,
  );

  const pascalCaseRuleName =
    ruleName.charAt(0).toUpperCase() + ruleName.slice(1);
  fs.writeFileSync(
    path.join(testConstructsDirectory, `${ruleName}.ts`),
    `import { Construct } from 'constructs';

import { ${ruleName} as ${pascalCaseRuleName}Rule } from '@sls-mentor/rules';

interface ${pascalCaseRuleName}Props {
  myProp: string;
}

export class ${pascalCaseRuleName} extends Construct {
  static passTestCases: Record<string, ${pascalCaseRuleName}Props> = {
    'One successful test case': { myProp: 'value1' },
    'Another successful test case': { myProp: 'value2' },
  };

  static failTestCases: Record<string, ${pascalCaseRuleName}Props> = {
    'One failing test case': { myProp: 'value3' },
  };

  constructor(scope: Construct, id: string, { myProp }: ${pascalCaseRuleName}Props) {
    super(scope, id);
    // const construct = new DefaultConstruct(this, 'DefaultConstruct', {
    //   cdkProp: myProp,
    // });
    // construct.tagRule(${pascalCaseRuleName}Rule);
    console.log(${pascalCaseRuleName}Rule);
  }
}    
`,
  );

  fs.appendFileSync(
    path.join(testConstructsDirectory, 'index.ts'),
    `export * from './${ruleName}';\n`,
  );

  fs.writeFileSync(
    path.join(rulesDirectory, ruleName, 'doc.md'),
    `# Documentation of ${ruleName} (update this file)

## Why ?

## How to fix ?

## Useful links

`,
  );

  process.exit(0);
});
