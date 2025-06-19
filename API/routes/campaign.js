const express = require('express');
const router = express.Router();
const checkJwt = require("../middleware/checkJwt");
const { createNewCampaign, getCampaignsByUserId, getCampaignByIdController } = require('../controllers/campaign.controller');

router.post('/', checkJwt, createNewCampaign);
router.get('/user/:userId', checkJwt, getCampaignsByUserId);
router.get('/campaign/:campaignId', checkJwt, getCampaignByIdController);

module.exports = router;