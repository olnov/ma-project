const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/checkJwt');

// This route needs authentication
router.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
    // user: req.auth
  });
});

module.exports = router;