import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0()

  if (!isAuthenticated) return null

  return (
    <Button 
    colorScheme="blue" size="md" 
    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  )
}

export default LogoutButton;
