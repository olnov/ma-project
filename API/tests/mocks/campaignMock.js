const mockNewCampaign = {
	title: 'Test Campaign Title',
	description: 'This is a test campaign',
	// createdBy: testUser,
	// projects: mockProjects,
};

const buildMockCampaign = ({
	// config object - can pass one paramater (an object, keys with default values)
	title=null,
	description=null,
	createdBy=null,
	projects=null
} = {}) => { // default value of {} in case nothing is passed in to. function
	return ({ 
		title,
		description,
		createdBy,
		projects,
	});
};

module.exports = {
	buildMockCampaign,
	mockNewCampaign,
};