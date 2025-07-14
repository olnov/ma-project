import {
  Flex,
  Heading,
  Spacer,
  HStack,
  Button,
} from "@chakra-ui/react";
import LoginButton from "../../../components/authentication/LoginButton";

const Navbar = () => {
  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="60px"
      zIndex="1000"
      bg="yellow.200"
      opacity={0.9}
      color="gray.800"
      align="center"
      px={6}
      border={"1px solid"}
      borderColor="gray.200"
    >
      <Heading size="2xl" className="pacifico-regular">
        RevYou
      </Heading>
      <HStack ml={6} flex={1}>
        <a href="#features" style={{ textDecoration: "none" }}>
          Features
        </a>
        <a href="#about" style={{ textDecoration: "none" }}>
          About Us
        </a>
      </HStack>
      <Spacer />
      <HStack ml={6}>
        {/* <Button>Login</Button> */}
        <LoginButton />
      </HStack>
    </Flex>
  );
};

export default Navbar;