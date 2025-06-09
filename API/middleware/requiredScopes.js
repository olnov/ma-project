// You can configure individual routes to look for a particular scope. 
// To achieve that, set up another middleware with the requiresScope method. 
// Provide the required scopes and apply the middleware to any routes you want to add authorization to.

// Pass the checkJwt and requiredScopes middlewares to the route you want to protect.

const { requiredScopes } = require('express-oauth2-jwt-bearer');

// In this configuration, only access tokens with the read:messages scope can access the endpoint.
const checkScopes = requiredScopes('read:messages');

module.exports = checkScopes;