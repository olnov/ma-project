// Exports all mocks as one object so they can be required by test files from one location
module.exports = {
    ...require('./authMock'),
    ...require('./userMock'),
    ...require('./campaignMock'),
    ...require('./projectMock'),
    ...require('./respondentMock'),
    ...require('./responseMock'),
};