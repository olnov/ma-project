import { useShareableProfile } from "./model/useShareableProfile";
import { ShareableProfileView } from "./ui/ShareableProfileView";

const ShareableProfilePage = () => {
  const userId = "6845d0ff6b26dd84fbe38c72"; // TODO: Replace with dynamic user ID from route params or context
  const { profileData, loading, error } = useShareableProfile(userId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!profileData) return <p>No profile data found.</p>;

  return <ShareableProfileView profileData={profileData} />;
};

export default ShareableProfilePage;
