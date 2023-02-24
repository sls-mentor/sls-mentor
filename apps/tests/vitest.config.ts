import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // globals: true,
    // globalSetup: './tests/testSetup/globalSetup.ts',
    testTimeout: 20000,
  },
});
