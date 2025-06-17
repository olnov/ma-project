const express = require('express');
const router = express.Router();
const { createNewCampaign, getCampaignsByUserId, getCampaignByIdController, getCampaingnByLinkController } = require('../controllers/campaign.controller');

router.post('/', createNewCampaign);
router.get('/user/:userId', getCampaignsByUserId);
router.get('/campaign/:campaignId', getCampaignByIdController);
router.get('/link/:linkUuid', getCampaingnByLinkController);

module.exports = router;