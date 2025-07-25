module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/tests/mocks/authMock.js',
    '<rootDir>/tests/setup/testDb.js'
  ],
  testTimeout: 5000,
  detectOpenHandles: true,
};