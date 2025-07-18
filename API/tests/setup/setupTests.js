console.log('setupTests.js loaded');

require('./authMock');    // checkJwt mock
require('./testDb');      // 🧹 in-memory Mongo setup
