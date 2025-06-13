import { getCampaignsByUser } from "../services/CampaignService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  Flex,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/react";

const DashboardPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [fileteredCampaigns, setFilteredCampaigns] = useState([]);
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    const stubUserId = "6845d0ff6b26dd84fbe38c72"; // Replace with actual user ID logic
    const response = await getCampaignsByUser(stubUserId);
    console.log("Fetched campaigns:", response);
    if (response.status === 200) {
      setCampaigns(response.data);
      setFilteredCampaigns(response.data);
    } else {
      console.error("Failed to fetch campaigns:", response.message);
    }
  };

  const countUniqueMembers = (projects) => {
    const uniqueMembers = new Set();
    projects.forEach((project) => {
      project.team.forEach((member) => {
        uniqueMembers.add(member.link);
      });
    });
    return uniqueMembers.size;
  };

  const handleSearch = (searchQuerry) => {
    setFilteredCampaigns(
      campaigns.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuerry.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <Box padding="20px">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        My Campaigns
      </Text>
      <HStack spacing={4} mb={4} width="100%">
        <Input
          placeholder="Filter campaigns by title..."
          size="md"
          name="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </HStack>
      {campaigns.length > 0 ? (
        <Flex direction="row" justify="space-between" align="center" mb={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} width="100%">
            {fileteredCampaigns.map((campaign) => (
              <Card.Root
                key={campaign._id}
                size="sm"
                bgColor="orange.50"
                shadow="md"
              >
                <Card.Body padding={3}>
                  <Flex direction="column" justify="space-between">
                    <Box>
                      <Text fontWeight="bold">{campaign.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        Total projects: {campaign.projects.length}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Total respondents:{" "}
                        {campaign.projects
                          .map((project) => project.team.length)
                          .reduce((sum, count) => sum + count, 0)}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Fedbacks provided:
                        {campaign.projects
                          .map((project) =>
                            project.team.map((respondent) =>
                              respondent.responded ? 1 : 0
                            )
                          )
                          .flat()
                          .reduce((sum, count) => sum + count, 0)}{" "}
                        out of{" "}
                        {campaign.projects
                          .map((project) => project.team.length)
                          .reduce((sum, count) => sum + count, 0)}
                      </Text>
                    </Box>
                    <Button size="xm" variant="surface" onClick={() => navigate(`/details/${campaign._id}`)}>
                      Details
                    </Button>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
          {/* Overall stats card */}
          <Box width="300px" marginLeft="20px">
            <Card.Root
              size="sm"
              bgColor="blue.50"
              shadow="md"
              position="sticky"
              height="fit-content"
            >
              <Card.Body padding={4}>
                <Text fontWeight="bold" mb={3}>
                  Campaigns Overview
                </Text>
                <VStack align="stretch" spacing={3}>
                  <Box>
                    <Text fontSize="sm">Total Campaigns</Text>
                    <Text fontWeight="bold">{campaigns.length}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">Active Projects</Text>
                    <Text fontWeight="bold">
                      {campaigns.reduce(
                        (sum, campaign) => sum + campaign.projects.length,
                        0
                      )}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">Total Respondents</Text>
                    <Text fontWeight="bold">
                      {countUniqueMembers(campaigns.flatMap((c) => c.projects))}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">Last Updated</Text>
                    <Text fontWeight="bold">
                      {new Date().toLocaleDateString()}
                    </Text>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Box>
        </Flex>
      ) : (
        <Text>No campaigns found.</Text>
      )}
    </Box>
  );
};

export default DashboardPage;
