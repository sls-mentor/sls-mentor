import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 50000,
    hookTimeout: 50000,
  },
});
