import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  silent: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
});
