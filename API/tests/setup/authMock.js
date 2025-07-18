console.log("authMock setup file loaded");

jest.mock('../../middleware/checkJwt', () => {
  return jest.fn((req, res, next) => {
    console.log("MOCK checkJwt running");
    req.auth = {
      payload: { sub: 'auth0|mocked-user-id' },
    };
    next();
  });
});