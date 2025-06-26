const express = require('express');
const { getShareableContentByUserId } = require('../controllers/shareable-profile.controller');

const router = express.Router();

router.get('/:userId', getShareableContentByUserId);

module.exports = router;