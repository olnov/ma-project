import { Flex, Heading, Spacer, Button, Avatar } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="60px"
      zIndex="1000"
      bg="yellow.100"
      color="gray.800"
      align="center"
      px={6}
      shadow="md"
    >
      <Heading size="md">MA-Project</Heading>
      <Spacer />
      <Avatar.Root size="sm" name="John Doe">
        <Avatar.Fallback name="John Doe" />
      </Avatar.Root>
    </Flex>
  );
};

export default TopBar;
