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


module.exports = {
    mockExistingUser,
    mockNonExistentUserPayload,
    mockUserUpdates,
}