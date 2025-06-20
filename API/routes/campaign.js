const express = require('express');
const router = express.Router();
const checkJwt = require("../middleware/checkJwt");
const { 
    createNewCampaign, 
    getCampaignsByUserId,
    getCampaignByIdController, 
    getCampaignByLinkController,
    saveCampaignFeedbackController, 
} = require('../controllers/campaign.controller');

router.post('/', checkJwt, createNewCampaign);
router.patch('/save-feedback', saveCampaignFeedbackController);
router.get('/user/:userId', checkJwt, getCampaignsByUserId);
router.get('/campaign/:campaignId', checkJwt, getCampaignByIdController);
router.get('/link/:linkUuid', getCampaignByLinkController);

module.exports = router;