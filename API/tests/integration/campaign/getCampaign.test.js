const {
	mockCheckJwt,
	mockToken,
	mockExistingUser,
	buildMockCampaign,
	mockNewCampaign,
	mockProjectOne,
	mockProjectTwo
} = require('../../mocks');

const request = require('supertest');
const app = require('../../../app');

const User = require('../../../models/user');
const Campaign = require('../../../models/campaign');
const Project = require('../../../models/project');

describe('GET routes', () => {

    beforeEach(async () => {
		// Create a test user before each test
		testUser = await User.create(mockExistingUser);
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

    describe('GET /user/:userId', () => {

    });

    describe('GET /campaign/:campaignId', () => {
        
    });

    describe('GET /link/:linkUuid', () => {

    });
});