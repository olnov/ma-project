import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) return null;

  return (
    <Button 
    colorScheme="blue" size="md" 
    onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;