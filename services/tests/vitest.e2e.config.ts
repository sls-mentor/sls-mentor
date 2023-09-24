import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['**/*.e2e-test.ts'],
    exclude: [...configDefaults.exclude, 'cdk.out/**', '**/*.test.ts'],
    hookTimeout: 120000,
    testTimeout: 120000,
  },
});
