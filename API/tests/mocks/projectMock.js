const Project = require('../../models/project');

const mockProjectOne = {
	title: "Test Project Title One",
	description: "This is a test project description for mockCampaignProjectOne",
	// startDate: new Date(),
	// endDate: null,
};

const mockProjectTwo = {
	title: "Test Project Title Two",
	description: "This is a test project description for mockCampaignProjectTwo",
	startDate: new Date(),
	endDate: null,
}

const buildMockProject = (testProjectDetails) => {
	return (
		new Project({
            title: testProjectDetails.title,
            description: testProjectDetails.description || "",
            startDate: testProjectDetails.startDate || new Date(),
            endDate: testProjectDetails.endDate || null,
		})
	);
}

module.exports = {
	buildMockProject,
	mockProjectOne,
	mockProjectTwo,
};