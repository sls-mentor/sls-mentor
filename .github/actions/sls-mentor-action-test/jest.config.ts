import type {Config} from 'jest'
const config: Config = {
  preset: 'ts-jest',
  globalTeardown: '<rootDir>/__tests__/jest-globals-teardown.ts',
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts', '**/*.test.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
}

export default config
