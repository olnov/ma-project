const express = require('express');
const router = express.Router();
const { createNewCampaign, getCampaignsByUserId, getCampaignByIdController } = require('../controllers/campaign.controller');

router.post('/', createNewCampaign);
router.get('/user/:userId', getCampaignsByUserId);
router.get('/campaign/:campaignId', getCampaignByIdController);

module.exports = router;