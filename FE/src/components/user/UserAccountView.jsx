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

const UserAccountView = ({ dbUser, onEdit }) => {
    return (
        <Card.Root
            bgColor="orange.50"
            shadow="md"
            maxW="600px"
            mx="auto"
            my={6}>
        
            <Card.Body>
                <VStack spacing={4} align="stretch">
                    <Field.Root mt={3}>
                        <Field.Label fontWeight="bold">
                            First name: <Text as="span" color="red.500" ml={1} opacity={0}>*</Text>
                        </Field.Label>
                        <Box
                            borderRadius="md"
                            py={2}
                            px={3}>
                            <Text fontSize="sm" color="gray.600">
                                {dbUser.firstName}
                            </Text>
                        </Box>
                    </Field.Root>

                    <Field.Root mt={3}>
                        <Field.Label fontWeight="bold">
                            Last name: <Text as="span" color="red.500" ml={1} opacity={0}>*</Text>
                        </Field.Label>
                        <Box
                            borderRadius="md"
                            py={2}
                            px={3}>
                            <Text fontSize="sm" color="gray.600">
                                {dbUser.lastName}
                            </Text>
                        </Box>
                    </Field.Root>

                    <Field.Root mt={3}>
                        <Field.Label fontWeight="bold">
                            Username:
                        </Field.Label>
                        <Box
                            borderRadius="md"
                            py={2}
                            px={3}>
                            <Text fontSize="sm" color="gray.600">
                                {dbUser.username}
                            </Text>
                        </Box>
                    </Field.Root>

                    <Field.Root mt={3}>
                        <Field.Label fontWeight="bold">
                            {/* <IconButton
                                size="xs"
                                variant="outline"
                                colorPalette="gray"
                                aria-label="Edit profile"
                                onClick={onEdit}>
                                <FaEdit size={14} />
                            </IconButton> */}
                            Email: <Text as="span" color="red.500" ml={1} opacity={0}>*</Text>
                        </Field.Label>
                        <Box
                            borderRadius="md"
                            py={2}
                            px={3}>
                            <Text fontSize="sm" color="gray.600">
                                {dbUser.email}
                            </Text>
                        </Box>
                    </Field.Root>

                    <HStack justify="flex-end">
                        <Button
                            // size="sm"
                            // variant="surface"
                            colorScheme="blue"
                            // leftIcon={<FaEdit />}
                            onClick={onEdit}
                            >
                            Edit
                        </Button>
                    </HStack>
                </VStack>
            </Card.Body>
        </Card.Root>

    );
};

export default UserAccountView;
