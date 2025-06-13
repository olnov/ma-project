const { findOrCreateProjects } = require("./project.service");
const Campaign = require("../models/campaign");
const User = require("../models/user");

const createCampaign = async (title, description, createdBy, projects) => {
  if (!title || !createdBy || !projects) {
    throw new Error("Title, createdBy, and projects are required");
  }

  const stubUser = await User.findOne({ email: "o.novikov@ymail.com" });
  if (!stubUser) throw new Error("User not found");

  const resolved = await findOrCreateProjects(projects);

  const campaignProjects = resolved.map(({ _id, originalIndex }) => {
    const team = (projects[originalIndex]?.team || []).map((member) => ({
      fullName: member.fullName,
      email: member.email,
      role: member.role,
      link: member.link,
      isResponded: member.isResponded ?? false,
      responseContents: member.responseContents ?? "",
    }));

    return {
      project: _id,
      team,
    };
  });

  const campaign = new Campaign({
    title,
    description,
    createdBy: stubUser._id,
    projects: campaignProjects,
  });

  await campaign.save();

  return campaign;
};

const getCampaignsByUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return Campaign.find({ createdBy: userId }).populate("projects.project");
};

const getCampaignByIdService = async (campaignId) => {
  if (!campaignId) {
    throw new Error("Campaign ID is not set");
  }
  const campaign = await Campaign.findById(campaignId).populate("projects.project").populate("createdBy", "email fullName");
  if (!campaign) {
    throw new Error("Campaign not found");
  }
  return campaign;
}


module.exports = {
  createCampaign,
  getCampaignsByUser,
  getCampaignByIdService,
};
