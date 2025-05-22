const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:5173',
  clientID: 'iBmZYeQNaZQXpu1rcE2j7WiROFC0WYwW',
  issuerBaseURL: 'https://dev-omoyoevc5ee5gmhe.uk.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});