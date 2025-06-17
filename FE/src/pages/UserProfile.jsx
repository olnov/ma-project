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
// import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { getUser, patchUserProfile } from "../services/userService";

import LogoutButton from "../components/authentication/LogoutButton";
import UserProfileView from "../components/user/UserProfileView";
import UserProfileForm from "../components/user/UserProfileForm";

const UserProfile = () => {
  // console.log("typeof UserProfileView:", typeof UserProfileView);
  // console.log("UserProfileView:", UserProfileView);

  // console.log("typeof UserProfileForm", typeof UserProfileForm);
  // console.log("UserProfileForm:", UserProfileForm);
  
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
      const token = getAccessTokenSilently();
      const res = await patchUserProfile(token, updateData);
      console.log("USER UPDATED!!!", res.data.user);
      setDbUser(res.data.user);
      return res.data.user;
    } catch (error) {
      console.error("Error sending patch request:", error);
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
          My Profile
        </Text>

      {editing? (
        <UserProfileForm
          dbUser={dbUser}
          onSave={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <UserProfileView
          dbUser={dbUser}
          onEdit={() => setEditing(true)}
        />
      )}
      <LogoutButton />
    </Box>
  );
};

export default UserProfile;

// const DisplayUserAccount = () => {

//     const [user, setUser] = useState({});
//     const { getAccessTokenSilently } = useAuth0();

//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const token = await getAccessTokenSilently();
//           const data = await getUser(token);
//           console.log("User fetched:", data);
//           setUser(data);
//         } catch (error) {
//           console.error("Error fetching user:", error);
//         }
//       };

//       fetchUser();
//     }, [getAccessTokenSilently]);
    

//   return (
//     <Box marginTop={"30px"}>
//       <Text fontSize="xl" fontWeight="bold" mb={4}>
//         My Account
//       </Text>
//       <p>User Email: {user.email}</p>
//       <LogoutButton />
//     </Box>
//   );
// };

// export default DisplayUserAccount;