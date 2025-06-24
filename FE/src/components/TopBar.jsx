import {
  Flex,
  Heading,
  Spacer,
  Link,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import LogoutButton from "./authentication/LogoutButton";

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
      <HStack spacing={4} ml={6}>
        <Link href="/dashboard">
          My Campaigns
        </Link>
        <Link href="/create-campaign">
          Create Campaign
        </Link>
        <Link href="/profile">
          Profile
        </Link>
        <Link href="/me">
          Account
        </Link>
        <LogoutButton
          size={"md"}
          colorPalette={"gray"} 
          variant={"surface"}
          fontWeight={"600"}
          alignContent={"flex-end"}
        />
      </HStack>
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
      <Link href="/profile">
      <Text ml={2} fontSize="sm" color="gray.600">
        John Doe
      </Text>
      </Link>
    </Flex>
  );
};

export default TopBar;
