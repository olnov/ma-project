const { createCampaign, getCampaignsByUser } = require("../services/campaign.service");

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

    // console.log("title", title);
    // console.log("description", description);
    // console.log("createdBy", createdBy);
    // console.log(
    //   JSON.stringify(
    //     projects.map((project) => ({
    //       title: project.title,
    //       startDate: project.startDate,
    //       endDate: project.endDate,
    //       team: project.team.map((member) => ({
    //         fullName: member.fullName,
    //         email: member.email,
    //         role: member.role,
    //         link: member.link,
    //         isResponded: member.isResponded ?? false,
    //         responseContents: member.responseContents ?? "",
    //       })),
    //     })),
    //     null,
    //     2 
    //   )
    // );
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
  const userId = req.params.userId || req.query.userId;
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


module.exports = {
  createNewCampaign,
  getCampaignsByUserId,
};
