module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/tests//setup/authMock.js',
    '<rootDir>/tests//setup/testDb.js'
  ],
  testTimeout: 5000,
  detectOpenHandles: true,
};