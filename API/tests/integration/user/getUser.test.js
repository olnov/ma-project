// checkJwt middleware mocked in authMock.js
const {
	mockCheckJwt,
	mockToken,
	mockExistingUser,
	mockNonExistentUserPayload,
	mockUserUpdates
} = require('../../setup/authMock'); 
const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/user');

describe('GET /me', () => {

	beforeEach(async () => {
		// Create a test user before each test
		await User.create(mockExistingUser);
		// Reset middleware mock to default mocked behavior before each test
		mockCheckJwt.mockImplementation((req, res, next) => {
			req.auth = {
				payload: { sub: mockExistingUser.auth0Id, scope: 'openid profile email' },
				token: mockToken,
			};
			next();
		});
	});

	afterEach(() => {
		jest.restoreAllMocks(); // Reset mocks after each test
	});

	it('returns a 400 if the Auth0 sub is missing from token payload', async () => {
		mockCheckJwt.mockImplementation((req, res, next) => {
			req.auth = {
				payload: { scope: 'openid profile email' }, // Simulate missing sub
				token: mockToken,
			};
			next();
		});
		const res = await request(app).get('/api/v1/users/me');
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/sub missing/i);
	});

	it('returns a 200 and the logged in user', async () => {
		const res = await request(app).get('/api/v1/users/me');
		expect(res.status).toBe(200);
		expect(res.body.user).toMatchObject(mockExistingUser);
	});

	it('returns a 404 if user not found', async () => {
		mockCheckJwt.mockImplementation((req, res, next) => {
			req.auth = {
				payload: {
					sub: mockNonExistentUserPayload.user.sub, // Simulates non-existent sub
					scope: 'openid profile email'
				}, 
				token: mockToken,
			};
			next();
		});
		const res = await request(app).get('/api/v1/users/me');
		expect(res.status).toBe(404);
		expect(res.body.message).toMatch(/user not found/i);
	});
	
	it('returns a 500 when there is a server error', async () => {
		//Simulates a server error when findOne method triggered
		jest.spyOn(User, 'findOne').mockImplementation(() => { 
			throw new Error('Simulated DB failure');
		});
		const res = await request(app).get('/api/v1/users/me');
		expect(res.status).toBe(500);
		expect(res.body.error).toMatch(/Server error/i);
	});
});

