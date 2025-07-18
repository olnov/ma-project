const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');

describe('User Routes', () => {
  beforeEach(async () => {
    await User.create({
      auth0Id: 'auth0|mocked-user-id',
      email: 'test_email@example.com',
      username: 'testUsername',
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
    });
  });

  it('GET /me returns user', async () => {
    const res = await request(app).get('/api/v1/users/me').expect(200);
    expect(res.body.user.email).toBe('test_email@example.com');
  });
});
