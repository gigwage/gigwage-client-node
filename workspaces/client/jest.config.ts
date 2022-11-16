export default {
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testPathIgnorePatterns: ['dist/'],
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    },
    {
      displayName: 'e2e',
      testMatch: ['<rootDir>/src/**/*.e2e.ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    },
  ],
};
