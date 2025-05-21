const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/checkJwt');

// You can configure individual routes to look for a particular scope. To achieve that, 
// set up another middleware with the requiresScope method. Provide the required scopes 
// and apply the middleware to any routes you want to add authorization to.
const checkScopes = requiredScopes('read:messages');
// Pass the checkJwt and requiredScopes middlewares to the route you want to protect.
router.get('/api/private-scoped', checkJwt, checkScopes, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

module.exports = router;