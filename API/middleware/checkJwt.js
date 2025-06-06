const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});


module.exports = checkJwt;