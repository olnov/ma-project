import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCampaignByLink } from "../services/CampaignService";
import { Box, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { formatDateRange } from '../utils/dateUtils';

const FeedbackFormPage = () => {
  const { linkUuid } = useParams();
  const [campaignData, setCampaignData] = useState(null);

  console.log("Processed link id:", linkUuid);

  const fetchCampaign = async () => {
    try {
      const response = await getCampaignByLink(linkUuid);
      if (response.status === 200) {
        console.log("Campaign data:", response.data);
        setCampaignData(response.data);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
    }
  };

  useEffect(() => {
    if (linkUuid) {
      fetchCampaign();
    }
  }, [linkUuid]);

  return (
    <>
      <Box p={8} maxW="600px" mx="auto" bg="white" borderRadius="md" boxShadow="lg">
        {campaignData ? (
          <>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Hi {campaignData.teamMember.fullName}!
              {campaignData.requestor.fullName} is requesting your feedback on your mutual project.
            </Text>
            <Text>Here is the project details</Text>
            <Text>Campaign title: {campaignData.title}</Text>
            <Text>Project: {campaignData.project.title}</Text>
            <Text>Dates: {formatDateRange(campaignData.project.projectStartDate, campaignData.project.projectEndDate)}</Text>
            <Text>Please write your thoughts bellow:</Text>
            <Textarea variant="outline" placeholder="outline" />
            <Button mt={4} colorScheme="blue" type="submit">
              Submit Feedback
            </Button>
          </>
        ) : (
          <Text>Loading campaign...</Text>
        )}
      </Box>
    </>
  );
};

export default FeedbackFormPage;
