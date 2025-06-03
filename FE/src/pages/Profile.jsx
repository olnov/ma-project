import { Box, Text } from "@chakra-ui/react";
// import { login } from "../services/AuthService";
// import { useNavigate } from "react-router-dom";
import Profile from "../components/user/Profile";
import LogoutButton from "../components/authentication/LogoutButton";

const ProfilePage = () => {
    return (
        <Box marginTop={"30px"}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                PROFILE PAGE
            </Text>
            <Profile />
            <LogoutButton />
        </Box>
    );
};

export default ProfilePage;