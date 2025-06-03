import { Box, Text, Input, Button, HStack, Flex } from "@chakra-ui/react";
import { createFeedbackRequest } from "../services/FeedbackService";
import { toaster } from "@/components/ui/toaster";
import { BiCopy } from "react-icons/bi";
import { useState } from "react";

const CreateCampaign = () => {
  const [link, setLink] = useState("");

  const handleRequestFeedback = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const feedbackRequestLink = await createFeedbackRequest(accessToken);
    if (feedbackRequestLink.status === 200) {
      setLink(feedbackRequestLink.data.link);
      toaster.create({
        title: "Feedback request created",
        description: `Your feedback request created successfully`,
        type: "success",
      });
    }
    if (feedbackRequestLink.status === 401) {
      toaster.create({
        title: "Error",
        description: "Token invalid or expired. Please log in again.",
        type: "error",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    toaster.create({
      title: "Link copied",
      description:
        "The feedback request link has been copied to your clipboard.",
      type: "success",
    });
  };

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      padding="20px"
      width="100%"
    >
      <Box
        marginTop="30px"
        padding="20px"
        maxWidth="600px"
        width="100%"
        mx="auto"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Create feedback campaign
        </Text>
        <Input placeholder="I.e. annual review 2025" size="md" mb={4} />
        <HStack spacing={4} mb={4}>
          <Input
            placeholder="Specify a project for feedback"
            size="md"
            value={link}
            readOnly
          />
          <Button onClick={handleCopyLink} variant="outline" bgColor="gray.300">
            Search
          </Button>
        </HStack>
        <Button colorScheme="blue" size="md" onClick={handleRequestFeedback}>
          Request Feedback
        </Button>
      </Box>
    </Flex>
  );
};
export default CreateCampaign;
