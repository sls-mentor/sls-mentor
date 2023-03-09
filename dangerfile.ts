import { danger, fail, message } from 'danger';

const createdFiles = danger.git.created_files;

const newRules: Record<string, boolean | undefined> = {};
createdFiles.forEach(file => {
  console.log(file);
  if (!file.match(/packages\/core\/src\/rules\/.*\/index\.ts/)) {
    return;
  }
  const rulePath = file.split('/');

  const ruleName = rulePath[4];
  if (newRules[ruleName] === undefined) {
    newRules[ruleName] = false;

    return;
  }
});

createdFiles.forEach(file => {
  if (!file.match(/^packages\/core\/src\/rules\/.*\/doc\.md$/)) {
    return;
  }
  const rulePath = file.split('/');

  const ruleName = rulePath[4].split('.')[0];
  if (newRules[ruleName] === false) {
    newRules[ruleName] = true;

    return;
  }
});

Object.keys(newRules).map(newRuleName => {
  if (newRules[newRuleName] === false) {
    fail(`New rule "${newRuleName}" is missing documentation 👿`);

    return;
  }
  message(`New rule "${newRuleName}" was created with documentation 🎉`);
});
