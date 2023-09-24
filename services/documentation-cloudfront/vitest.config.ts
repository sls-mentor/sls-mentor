import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, 'cdk.out/**'],
    setupFiles: './vitest.setup.ts',
  },
});
