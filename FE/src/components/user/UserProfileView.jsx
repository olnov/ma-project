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
} from "@chakra-ui/react";
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { FcCalendar, FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";

const UserProfileView = ({ dbUser, onEdit }) => {
    return (
        <Card.Root
            size="sm"
            bgColor="orange.50"
            shadow="md"
            maxW="600px"
            mx="auto"
            my={6}
        >
            <Card.Body padding={3}>
                <VStack spacing={3} align="stretch">
                    <Text fontWeight="bold">
                        Name:
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        {dbUser.firstName} {dbUser.lastName}
                    </Text>

                    <Text fontWeight="bold">
                        Username:
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        {dbUser.username}
                    </Text>

                    <Text fontWeight="bold">
                        {/* <IconButton
                            size="xs"
                            variant="outline"
                            colorPalette="gray"
                            aria-label="Edit profile"
                            onClick={onEdit}>
                            <FaEdit size={14} />
                        </IconButton> */}
                        Email:
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        {dbUser.email}
                    </Text>

                    {/* <HStack > */}
                        <Button
                            size="sm"
                            variant="surface"
                            colorScheme="blue"
                            leftIcon={<FaEdit />}
                            onClick={onEdit}
                            >
                            Edit
                        </Button>
                        {/* <IconButton
                            size="sm"
                            variant="outline"
                            colorPalette="gray"
                            aria-label="Edit profile"
                            onClick={onEdit}>
                            <FaEdit size={14} />
                        </IconButton> */}
                    {/* </HStack> */}
                </VStack>
            </Card.Body>
        </Card.Root>

    );
};

export default UserProfileView;
