import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const prompt = createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question('Name of the new rule?\n-> ', ruleName => {
  if (typeof ruleName !== 'string') {
    throw new Error('Rule name must be a string');
  }

  fs.mkdirSync(path.join(__dirname, '../src/rules', ruleName));

  fs.writeFileSync(
    path.join(__dirname, '../src/rules', ruleName, 'index.ts'),
    `import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  await Promise.resolve(resourceArns); // Delete this line

  return { results: [] };
};

export const ${ruleName}: Rule = {
  ruleName: '<Displayed rule name>',
  errorMessage: '<Displayed error message>',
  run,
  fileName: '${ruleName}', // Do not change
  categories: ['GreenIT'], // Set categories related to rule
  level: 3, // Set level related to rule
  service: 'Lambda', // Set service related to rule
};
`,
  );

  fs.appendFileSync(
    path.join(__dirname, '../src/rules/index.ts'),
    `export * from './${ruleName}';\n`,
  );

  fs.writeFileSync(
    path.join(__dirname, '../src/rules', ruleName, 'doc.md'),
    `# Documentation of ${ruleName} (update this file)

## Why ?

## How to fix ?

## Useful links

`,
  );

  process.exit(0);
});
