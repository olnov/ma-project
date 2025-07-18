// // tests/setup/authMock.js
// import jest from 'jest-mock';
// import checkJwt from '../../middleware/checkJwt';

// // Replace the real middleware with a no-op that injects a fake user
// jest.unstable_mockModule('../../src/middleware/checkJwt.js', () => ({
//   default: (req, _res, next) => {
//     req.auth = { sub: 'auth0|testuser', permissions: ['read:feeds'] };
//     next();
//   },
// }));

jest.mock('../../middleware/checkJwt', () => {
  return () => (req, res, next) => {
    req.auth = {
      sub: 'auth0|mocked-user-id',
      permissions: ['read:users']
    };
    next();
  };
});