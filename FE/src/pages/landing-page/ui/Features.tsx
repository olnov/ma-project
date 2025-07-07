import { Heading, Text, HStack, Box, Container } from "@chakra-ui/react";

const Features = () => {
  return (
    <Container
      id="features"
      maxW="container.xl"
      px={6}
      py={12}
      textAlign="center"
      position="relative"
      border="1px solid"
      borderColor="gray.200"
      style={{
        background: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
      }}
    >
      <Heading
        as="h1"
        fontWeight="bold"
        color="gray.900"
        mb={6}
        fontSize={["xl", "3xl", "4xl", "5xl"]}
        lineHeight="0.6"
        textAlign="center"
      >
        Why Choose Feedly?
      </Heading>
      <Text
        fontSize={["lg", "xl", "2xl"]}
        color="gray.600"
        mb={12}
        maxW="2xl"
        mx="auto"
        lineHeight="relaxed"
      >
        Discover the key features that make Feedly the best choice for your
        feedback needs.
      </Text>
      <HStack
        justify="center"
        mt={12}
        mb={8}
        flexDirection="row"
        alignItems="center"
      >
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800">
            Easy to Use
          </Heading>
          <Text color="gray.600">
            Intuitive interface that makes it easy to request and give feedback.
          </Text>
        </Box>
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800">
            360° Feedback
          </Heading>
          <Text color="gray.600">
            Collect feedback from managers, peers, and direct reports for
            complete perspective.
          </Text>
        </Box>
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
          height={200}
          width={{ base: "100%", md: "auto" }}
        >
          <Heading as="h3" size="md" mb={2} color="gray.800">
            Actionable Insights
          </Heading>
          <Text color="gray.600">
            Advanced analytics help you understand patterns and track your
            professional growth.
          </Text>
        </Box>
      </HStack>
    </Container>
  );
};

export default Features;
