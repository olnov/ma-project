const express = require('express');
const { createFeedbackRequest } = require('../controllers/feedback.controller.js');
const checkJwt = require('../middleware/checkJwt.js');
const router = express.Router();

router.post('/', checkJwt, createFeedbackRequest);

module.exports = router;
