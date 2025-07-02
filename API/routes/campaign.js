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

router.post('/', checkJwt, createNewCampaign
    /* #swagger.parameters['createCampaign'] = {
            in: 'body',
            description: 'Create a new campaign',
            required: true
        } */
);
router.patch('/save-feedback', saveCampaignFeedbackController
    /* #swagger.parameters['saveFeedback'] = {
            in: 'body',
            description: 'Save feedback for a campaign',
            required: true */
);
router.get('/user/:userId', checkJwt, getCampaignsByUserId
    /* #swagger.parameters['userId'] = {
            in: 'path',
            description: 'Retrieve all campaigns created by a user',
            required: true,
            type: 'string'
        } */
);
router.get('/campaign/:campaignId', checkJwt, getCampaignByIdController
    /* #swagger.parameters['campaignId'] = {
            in: 'path',
            description: 'Retrieve a campaign object by its ID',
            required: true,
            type: 'string'
        } */
);
router.get('/link/:linkUuid', getCampaignByLinkController
    /* #swagger.parameters['linkUuid'] = {
            in: 'path',
            description: 'Retrieve a parent campaign object by one of the child link UUIDs',
            required: true,
            type: 'string'
        } */
);

module.exports = router;