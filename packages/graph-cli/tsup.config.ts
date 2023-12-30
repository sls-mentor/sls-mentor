import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  silent: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  // Bundle all internal packages before publishing to npm
  noExternal: [/@sls-mentor/],
});
