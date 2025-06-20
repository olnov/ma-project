const express = require('express');
const router = express.Router();
const { 
    createNewCampaign, 
    getCampaignsByUserId,
    getCampaignByIdController, 
    getCampaignByLinkController,
    saveCampaignFeedbackController, 
} = require('../controllers/campaign.controller');

router.post('/', createNewCampaign);
router.patch('/save-feedback', saveCampaignFeedbackController);
router.get('/user/:userId', getCampaignsByUserId);
router.get('/campaign/:campaignId', getCampaignByIdController);
router.get('/link/:linkUuid', getCampaignByLinkController);

module.exports = router;