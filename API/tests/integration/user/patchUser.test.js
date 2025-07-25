const {
	mockCheckJwt,
	mockToken,
	mockExistingUser,
	mockUserUpdates
} = require('../../mocks');
const request = require('supertest');
const app = require('../../../app');

const User = require('../../../models/user');

describe('PATCH /me/update-profile', () => {

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
				payload: {}, // Simulate missing sub
				token: mockToken,
			};
			next();
		});
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send({
				auth0Sub: mockExistingUser.auth0Id,
				updates: mockUserUpdates
			});
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/sub missing/i);
	});

	it('returns a 200, updates user in database and returns updated user', async () => {
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send({ updates: mockUserUpdates });
		expect(res.status).toBe(200);
		expect(res.body.user).toMatchObject(mockUserUpdates);
	});

	it('returns a 400 if no updates are sent', async () => {
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send({});
		expect(res.status).toBe(400);
		});

	it('returns a 400 if updates are not sent as an object', async () => {
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send(mockUserUpdates);
		expect(res.status).toBe(400);
	});

	it('only updates allowed fields', async () => {
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send({ updates: {...mockUserUpdates, auth0Id: 'auth0|protected-field'} });
		expect(res.status).toBe(200);
		expect(res.body.user).toMatchObject(mockUserUpdates);
		expect(res.body.user.auth0Id).toBe(mockExistingUser.auth0Id); //auth0Id should remain unchanged
	});

	it('returns a 500 when there is a server error', async () => {
		jest.spyOn(User, 'findOneAndUpdate').mockImplementation(() => { //Simulates a server error
			throw new Error('Simulated DB failure');
		});
		const res = await request(app).patch('/api/v1/users/me/update-profile')
			.set('Content-Type', 'application/json')
			.send({ updates: mockUserUpdates });
		expect(res.status).toBe(500);
		expect(res.body.error).toMatch(/Server error/i);
	});
});

