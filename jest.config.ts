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
};
