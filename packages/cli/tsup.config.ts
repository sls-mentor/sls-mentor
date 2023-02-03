import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  silent: true,
  noExternal: ['@sls-mentor/core'],
  outDir: 'dist',
});
