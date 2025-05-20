const express = require('express');
const { createFeedbackRequest } = require('../controllers/feedback.controller.js');
const { tokenChecker } = require('../middleware/tokenChecker.js');
const router = express.Router();

router.post('/', tokenChecker, createFeedbackRequest);

module.exports = router;
