const { getCampaignsByUser } = require("../services/campaign.service");

const getShareableContentByUserId = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const campaigns = await getCampaignsByUser(userId);
    res.status(200).json(
      campaigns
        .map((campaign) => {
          const filteredProjects = campaign.projects
            .map((project) => {
              const respondedTeam = project.team
                .filter((member) => member.responded)
                .map((member) => ({
                  fullName: member.fullName,
                  role: member.role,
                  responded: member.responded,
                  responses: [member.responses],
                }));

              return respondedTeam.length > 0
                ? {
                    projectId: project.project._id,
                    projectName: project.project.title,
                    team: respondedTeam,
                  }
                : null;
            })
            .filter(Boolean); // remove nulls (projects with no responded members)

          return filteredProjects.length > 0
            ? {
                id: campaign._id,
                title: campaign.title,
                projects: filteredProjects,
              }
            : null;
        })
        .filter(Boolean) // remove campaigns with no responded projects
    );
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getShareableContentByUserId,
};
