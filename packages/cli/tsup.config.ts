import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  silent: true,
  noExternal: ['core'],
  outDir: 'dist',
});
