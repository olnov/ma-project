import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  Span,
  Flex,
  Text,
  Badge,
  IconButton,
  VStack,
  Field,
  Spinner
} from "@chakra-ui/react";
import { FcCalendar, FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { useAuth0 } from "@auth0/auth0-react";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getUser, patchUserProfile } from "../services/userService";

import LogoutButton from "../components/authentication/LogoutButton";
import UserAccountView from "../components/user/UserAccountView";
import UserAccountForm from "../components/user/UserAccountForm";

const UserAccount = () => {
  
  const { isLoading: authIsLoading, getAccessTokenSilently } = useAuth0();
  const [dbUser, setDbUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (authIsLoading) {
      return;
    }

    getAccessTokenSilently()
    .then((token) => {
      return getUser(token);
    })
    .then((res) => {
      setDbUser(res.data.user);
      setLoading(false);
      console.log("User fetched:", res.data);
    })
    .catch((error) => {
      console.log("Error fetching user: ", error);
      setLoading(false);
    })
  }, [authIsLoading, getAccessTokenSilently]);

  const handleUpdate = async (updateData) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await patchUserProfile(token, updateData);
      console.log("User profile updated:", res.data.user);

      setDbUser(res.data.user);

      setEditing(false);

      toaster.create({
        title: "User account updated",
        description: `Your account details were updated successfully`,
        type: "success",
      });
      return res.data.user;

    } catch (error) {
      console.error("Error sending patch request:", error);
      toaster.create({
        title: "Error",
        description: `Unable to update your account details.`,
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  };

  return (
    // <Box mt={4} width="100%">
    <Box padding="20px">
      {/* <Span fontSize="2xl" fontWeight="bold">
        Your Profile
      </Span> */}
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          My Account
        </Text>

      {editing? (
        <UserAccountForm
          dbUser={dbUser}
          onSave={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <UserAccountView
          dbUser={dbUser}
          onEdit={() => setEditing(true)}
        />
      )}
      <LogoutButton />
    </Box>
  );
};

export default UserAccount;