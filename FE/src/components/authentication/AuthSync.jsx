import { Box, Text, Button } from "@chakra-ui/react";
import { syncUser } from "../../services/userService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// This syncs the user profile information from the Auth0 ID token with MongoDB users
//If user doesn't exist (i.e. on user's first sign-up/login) in the mongoDB, a new user is created with the profle information from Auth0
const AuthSync = () => {
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    // const hasSynced = sessionStorage.getItem("hasSynced");
        // Attempt to make sync happen only once per session
    // const hasSyncedRef = useRef(false); 
        // Attempt to make sync happen only once after login

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;
        // if (isLoading || !isAuthenticated || hasSynced === "true") return; 
            //Attempt to make sync happen only once per session
        // if (isLoading || !isAuthenticated || hasSyncedRef.current) return;
            // Attempt to make sync happen only once after login

        const runSync = async () => {
            try {
                const token = await getAccessTokenSilently();
                console.log("USER = ", user);
                await syncUser(token, user);
                console.log("user synced once this session");
                // hasSynced.setItem("hasSynced", "true"); //Attempt to make sync happen only once per session
                // hasSyncedRef.current = true; //Attempt to make sync happen only once after login
            } catch (error) {
                console.error("user sync failed: ", error);
            }
        };

        runSync();

    }, [user, isLoading, isAuthenticated, getAccessTokenSilently]);
    
    return null;
};

export default AuthSync;