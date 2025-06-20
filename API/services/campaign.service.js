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

const getCampaignByLinkService = async (linkUuid) => {
  if (!linkUuid) {
    throw new Error("Link is not set");
  }
  const campaign = await Campaign.findOne({ "projects.team.link": { $regex: `${linkUuid}$` } })
    .populate("projects.project")
    .populate("createdBy", "email firstName lastName");
  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const projectEntry = campaign.projects.find((p) => p.team.some((member) => member.link.endsWith(linkUuid)));
  if (!projectEntry) {
    throw new Error("Project entry with the specified link not found");
  }
  const teamMember = projectEntry.team.find((member) => member.link.endsWith(linkUuid));
  if (!teamMember) {
    throw new Error("Team member with the specified link not found");
  }
  const campaignId = campaign._id.toString();
  return {
    "campaignId": campaignId,
    "title": campaign.title,
    "requestor": {
      "fullName": campaign.createdBy.firstName + " " + campaign.createdBy.lastName,
      "email": campaign.createdBy.email,
    },
    "project": {
      "title": projectEntry.project.title,
      "projectStartDate": projectEntry.project.startDate,
      "projectEndDate": projectEntry.project.endDate,
    },
    "teamMember": {
      "fullName": teamMember.fullName,
      "email": teamMember.email,
      "role": teamMember.role,
      "link": teamMember.link,
      "isResponded": teamMember.responded,
      "responseContents": teamMember.responses || "",
    },
  }
};

const saveCampaignFeedbackService = async (campaignId, linkUuid, responseContents) => {
  if (!campaignId || !linkUuid || !responseContents) {
    throw new Error("Campaign ID, team member link, and response contents are required");
  }
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) {
    throw new Error("Campaign not found");
  }
  const projectEntry = campaign.projects.find((p) => p.team.some((member) => member.link.endsWith(linkUuid)));
  if (!projectEntry) {
    throw new Error("Project entry with the specified link not found");
  }
  const savedFeedback = await Campaign.updateOne(
    { _id: campaignId, "projects.team.link": { $regex: `${linkUuid}$` } },
    { 
      $set: { "projects.$[project].team.$[member].responded": true },
      $push: { "projects.$[project].team.$[member].responses": { content:responseContents} },
    },
    {
      arrayFilters: [
        { "project.project": projectEntry.project._id },
        { "member.link": { $regex: `${linkUuid}$` } }
      ]
    }
  );
  if (savedFeedback.modifiedCount === 0) {
    throw new Error("Failed to save feedback");
  }
  return {
    status: "success",
    message: "Feedback saved successfully",
  };
}


module.exports = {
  createCampaign,
  getCampaignsByUser,
  getCampaignByIdService,
  getCampaignByLinkService,
  saveCampaignFeedbackService,
};
