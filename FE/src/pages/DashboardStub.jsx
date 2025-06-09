import { getCampaignsByUser } from "../services/CampaignService";
import { useEffect, useState } from "react";

const DashboardStub = () => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const stubUserId = "6845d0ff6b26dd84fbe38c72"; // Replace with actual user ID logic
    const response = await getCampaignsByUser(stubUserId);
    console.log("Fetched campaigns:", response);
    if (response.status === 200) {
      setCampaigns(response.data);
    } else {
      console.error("Failed to fetch campaigns:", response.message);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Stub</h1>
      <p>This is a stub for the dashboard page.</p>
      <h2>Your Campaigns</h2>
      {campaigns.length > 0 ? (
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign._id}>
              <strong>{campaign.title}</strong>
              <br/>
              <ul>
                {campaign.projects.map((p) => (
                  <li key={p._id}>{p.project.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
};

export default DashboardStub;
