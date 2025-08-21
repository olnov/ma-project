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

// populated beforeEach test 
let testUser; // allows user._id to be generated
let goodCampaignTestData;

describe('POST /', () => {

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
		const mockProjects = [mockProjectOne, mockProjectTwo]
		goodCampaignTestData = buildMockCampaign({
			title: mockNewCampaign.title,
			description: mockNewCampaign.description,
			createdBy: testUser,
			projects: mockProjects
		});
	});

	afterEach(() => {
		jest.restoreAllMocks(); // Reset mocks after each test
	});

	it('returns a 201 and the new campaign', async () => {
		const res = await request(app)
			.post('/api/v1/campaigns/')
			.set('Content-Type','application/json')
			.send(goodCampaignTestData);

		const createdCampaign = res.body.campaign;
		expect(res.status).toBe(201);
		expect(res.body.message).toBe('Campaign created successfully');
		expect(createdCampaign).toMatchObject({
			title: goodCampaignTestData.title,
			description: goodCampaignTestData.description,
			createdBy: expect.objectContaining({
				_id: testUser._id.toString(),
				email: testUser.email
			})
		});
		// Test projects are correctly created in a campaign
		expect(createdCampaign.projects).toHaveLength(2);

		const createdProjectOne = await Project.findById(createdCampaign.projects[0].project);
		expect(createdProjectOne).toMatchObject({ title: mockProjectOne.title });
		
		const createdProjectTwo = await Project.findById(createdCampaign.projects[1].project);
		expect(createdProjectTwo).toMatchObject({ title: mockProjectTwo.title });
	});

	it('returns a 400 if title, createdBy or projects are missing from payload', async () => {
		const requiredFields = ['title', 'createdBy', 'projects'];
		// test attempt to create campaign with each required field omitted
		for (const field of requiredFields) {
			const badCampaignTestData = {...goodCampaignTestData};
			delete badCampaignTestData[field];
			const res = await request(app)
				.post('/api/v1/campaigns/')
				.set('Content-Type','application/json')
				.send(badCampaignTestData);
			expect(res.status).toBe(400);
			expect(res.body.message).toBe("Title, createdBy, and projects are required");
		};
		// Test attempt to create campaign with non-required field omitted
		const badCampaignTestData = {...goodCampaignTestData};
		delete badCampaignTestData['description'];
		const res = await request(app)
			.post('/api/v1/campaigns/')
			.set('Content-Type','application/json')
			.send(badCampaignTestData);
		expect(res.status).toBe(201);
		expect(res.body.message).toBe("Campaign created successfully");			
	});

	it('returns a 500 when there is a server error', async () => {
		jest.spyOn(User, 'findById').mockImplementation(() => {
			throw new Error('Simulated DB failure'); //Simulates a server error
		});
		const res = await request(app)
			.post('/api/v1/campaigns/')
			.set('Content-Type','application/json')
			.send(goodCampaignTestData);
		expect(res.status).toBe(500);
		expect(res.body.message).toMatch(/Server error/i);
	})

});