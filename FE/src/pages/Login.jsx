// Stub login page
// TODO: Remove or replace with the actual Auth0 login logic.

import { Box, Text, Button } from "@chakra-ui/react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login();
      localStorage.setItem("accessToken", response.accessToken);
      console.log("Login successful:", response);
      navigate("/request-feedback");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box marginTop={"30px"}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Welcome to the Feedback App!
      </Text>
      <Button colorScheme="blue" size="md" onClick={handleLogin}>
        Log In
      </Button>
    </Box>
  );
};
export default Login;
