module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests//setup/setupTests.js'],
  testTimeout: 5000,
  detectOpenHandles: true,
};