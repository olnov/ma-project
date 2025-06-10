const express = require('express');
const router = express.Router();
const { createNewCampaign, getCampaignsByUserId } = require('../controllers/campaign.controller');

router.post('/', createNewCampaign);
router.get('/:userId', getCampaignsByUserId);

module.exports = router;