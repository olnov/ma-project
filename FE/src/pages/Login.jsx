// CAN DELETE

import { Box, Text } from "@chakra-ui/react";
import LoginButton from "../components/authentication/LoginButton";


const Login = () => {
  return (
    <Box marginTop={"30px"}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Welcome to the Feedback App!
      </Text>
      <LoginButton />
    </Box>
  );
};

export default Login;
