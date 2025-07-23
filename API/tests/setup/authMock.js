// This file is run automatically by Jest before tests (via setupFilesAfterEnv)

console.log("authMock setup file loaded");

const mockExistingUser = {
	auth0Id: 'auth0|mocked-user-id',
	email: 'test_email@example.com',
	username: 'testUsername',
	firstName: 'TestFirstName',
	lastName: 'TestLastName',
};
const mockNonExistentUserPayload = {
	user: {
		email: 'new_email@example.com',
		family_name: 'NewLastName',
		given_name: 'NewFirstName',
		nickname: 'newUsername',
		sub: 'auth0|non-existent-sub'
	}
};

const mockUserUpdates = {
	email: 'updated-test_email@example.com',
	username: 'updatedTestUsername',
	firstName: 'UpdatedTestFirstName',
	lastName: 'UpdatedTestLastName',
};

const mockToken = 'mocktoken123';

// mocks Auth0 middleware
const mockCheckJwt = jest.fn((req, res, next) => {
  console.log("✅ MOCK checkJwt running");
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
	mockExistingUser,
	mockNonExistentUserPayload,
	mockUserUpdates,
	mockToken,
  mockCheckJwt,
};

