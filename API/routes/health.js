const express = require('express');
const router = express.Router();

// Simple GET route to check if the API is running
router.get('/health', (req, res)=> {
  res.json({ status: 'ok', message: 'API is running' });
});

module.exports = router;