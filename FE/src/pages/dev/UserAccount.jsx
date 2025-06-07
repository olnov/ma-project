import { Box, Text, Button } from "@chakra-ui/react";
import { getUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/authentication/LogoutButton";

const DisplayUserAccount = () => {
  const [user, setUser] = useState({});
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
    .then((token) => {
      return getUser(token);
    })
    .then((data) => {
      console.log("User fetched:", data);
      setUser(data);
    })
    .catch((error) => {
      console.log("Error fetching user: ", error);
    })
  }, [getAccessTokenSilently]);

    return (
    <Box marginTop={"30px"}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        My Account
      </Text>
      <p>User Email: {user.email}</p>
      <LogoutButton />
    </Box>
  );
}

export default DisplayUserAccount;

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