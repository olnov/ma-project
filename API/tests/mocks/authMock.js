// This file is run automatically by Jest before tests (via setupFilesAfterEnv)
console.log("authMock setup file loaded");

const mockToken = 'mocktoken123';

// mocks Auth0 middleware
const mockCheckJwt = jest.fn((req, res, next) => {
  console.log("mockCheckJwt running");
  req.auth = {
    payload: {
      sub: 'auth0|mocked-user-id',
      scope: 'openid profile email'
    },
    token: mockToken
  };
  next();
});

jest.mock('../../middleware/checkJwt', () => mockCheckJwt);

module.exports = {
	mockToken,
  mockCheckJwt,
};

