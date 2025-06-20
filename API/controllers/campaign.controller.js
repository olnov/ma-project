const { 
  createCampaign, 
  getCampaignsByUser, 
  getCampaignByIdService, 
  getCampaignByLinkService,
  saveCampaignFeedbackService,
} = require("../services/campaign.service");

const createNewCampaign = async (req, res) => {
  const { title, description, createdBy, projects } = req.body;
  let campaign;
  try {
    if (!title || !createdBy || !projects) {
      return res
        .status(400)
        .json({ message: "Title, createdBy, and projects are required" });
    }
    campaign = await createCampaign(title, description, createdBy, projects);

  } catch (error) {
    console.error("Error creating campaign:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  res
    .status(201)
    .json({
      message: "Campaign created successfully",
      campaign: campaign,
    });
};

const getCampaignsByUserId = async (req, res) => {
  const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const campaigns = await getCampaignsByUser(userId);
        res.status(200).json(campaigns);
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCampaignByIdController = async (req, res) => {
  const campaignId = req.params.campaignId;
  console.log("Fetching campaign with ID:", campaignId);
  if (!campaignId) {
    return res.status(400).json({ message: "Campaign ID is not set" });
  }
  try {
    const campaign = await getCampaignByIdService(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCampaignByLinkController = async (req, res) => {
  const linkUuid = req.params.linkUuid;
  console.log("Fetching campaign with link:", linkUuid);
  if (!linkUuid) {
    return res.status(400).json({ message: "Link is not set" });
  }
  try {
    const campaign = await getCampaignByLinkService(linkUuid);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error("Error fetching campaign by link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const saveCampaignFeedbackController = async (req, res) => {
  const { campaignId, linkUuid, responseContents } = req.body;
  if (!campaignId || !linkUuid || !responseContents) {
    return res.status(400).json({ message: "Campaign ID, link UUID, and feedback are required" });
  }
  try {
    const updatedCampaign = await saveCampaignFeedbackService(campaignId, linkUuid, responseContents);
    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found or feedback not saved" });
    }
    res.status(200).json({ message: "Feedback saved successfully", campaign: updatedCampaign });
  } catch (error) {
    console.error("Error saving campaign feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  createNewCampaign,
  getCampaignsByUserId,
  getCampaignByIdController,
  getCampaignByLinkController,
  saveCampaignFeedbackController,
};
