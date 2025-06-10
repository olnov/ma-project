import { Flex, Heading, Spacer, Button, Avatar, Text } from "@chakra-ui/react";

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
      rounded={"md"}
    >
      <Heading size="md">Makers Agency</Heading>
      <Spacer />
      <Avatar.Root size="sm" name="John Doe">
        <Avatar.Fallback name="John Doe" />
        <Avatar.Image
          src="https://bit.ly/dan-abramov"
          alt="John Doe"
          borderRadius="full"
          // boxSize="40px"
        />
      </Avatar.Root>
      <Text ml={2} fontSize="sm" color="gray.600">
          John Doe
      </Text>
    </Flex>
  );
};

export default TopBar;
