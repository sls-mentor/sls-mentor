import { rules } from '@sls-mentor/core';
import fs from 'fs';
import path from 'path';

if (fs.existsSync(path.join(__dirname, '../docs/rules'))) {
  fs.rmSync(path.join(__dirname, '../docs/rules'), { recursive: true });
}

fs.mkdirSync(path.join(__dirname, '../docs/rules'));
rules.forEach(({ fileName }) => {
  fs.copyFileSync(
    path.join(
      __dirname,
      '../../../packages/core/src/rules',
      fileName,
      'doc.md',
    ),
    path.join(__dirname, '../docs/rules', fileName + '.md'),
  );
});
