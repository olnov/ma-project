import {
  Box,
  Card,
  CardBody,
  Text,
  Input,
  VStack,
  HStack,
  Button,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

const UserAccount = ({ user, onUpdate }) => {

  const [editing, setEditing] = useState(false);
  // const [formData, setFormData] = useState({
  //   firstName: user.firstName || "",
  //   lastName: user.lastName || "",
  //   email: user.email || "",
  //   username: user.username || "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
  //   onUpdate(formData);
  //   setEditing(false);
  // };

  return (
    <Box mt={4} width="100%">
      <Text fontSize="2xl" fontWeight="bold">
        My Profile
      </Text>

      <Card.Root color="black" size="sm" bgColor="blue.50" mt={3}>
        <CardBody padding={4}>
          <VStack spacing={4} align="stretch">
            {editing ? (
              <>
                <Input
                  name="firstName"
                  // value={formData.firstName}
                  // onChange={handleChange}
                  placeholder="First Name"
                  size="sm"
                />
                <Input
                  name="lastName"
                  // value={formData.lastName}
                  // onChange={handleChange}
                  placeholder="Last Name"
                  size="sm"
                />
                <Input
                  name="username"
                  // value={formData.username}
                  // onChange={handleChange}
                  placeholder="Username"
                  size="sm"
                />
                <Input
                  name="email"
                  // value={formData.email}
                  // onChange={handleChange}
                  placeholder="Email"
                  size="sm"
                  isDisabled
                />
              </>
            ) : ( 
              <>
                <Text>
                  {/* <strong>Name:</strong> {user.firstName} {user.lastName} */}
                  <strong>Name:</strong> 
                </Text>
                <Text>
                  {/* <strong>Username:</strong> {user.username} */}
                  <strong>Username:</strong>
                </Text>
                <Text>
                  {/* <strong>Email:</strong> {user.email} */}
                  <strong>Email:</strong> 
                </Text>
              </>
            )}

            <HStack justify="flex-end" spacing={2}>
              {editing ? (
                <Button
                  size="sm"
                  leftIcon={<FaSave />}
                  // onClick={handleSave}
                  colorPalette="blue"
                >
                  Save
                </Button>
              ) : ( 
                <IconButton
                  size="sm"
                  variant="outline"
                  icon={<FaEdit />}
                  aria-label="Edit profile"
                  // onClick={() => setEditing(true)}
                />
              )}
            </HStack>
          </VStack>
        </CardBody>
      </Card.Root>
    </Box>
  );
};

export default UserAccount;
