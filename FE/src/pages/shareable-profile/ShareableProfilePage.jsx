import { getShareableProfile } from "../../services/ShareableProfileService";
import { useEffect, useState } from "react";

const ShareableProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  const userId = "6845d0ff6b26dd84fbe38c72"; // Replace with dynamic user ID as needed

  const fetchProfileData = async () => {
    try {
      const response = await getShareableProfile(userId);
      if (response.status === 200) {
        console.log("Profile data fetched successfully:", response.data);
        setProfileData(response.data);
      } else {
        console.error("Failed to fetch profile data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Shareable Profile Page</h1>
      <p className="text-lg">This is a shareable profile page.</p>
    </div>
  );
};

export default ShareableProfilePage;
