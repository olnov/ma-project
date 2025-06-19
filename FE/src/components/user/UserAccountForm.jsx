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
import { useState } from "react";

const UserAccountForm = ({ dbUser, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: dbUser.firstName || "",
        lastName: dbUser.lastName || "",
        username: dbUser.username || "",
        email: dbUser.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Card.Root
            bgColor="orange.50"
            shadow="md"
            maxW="600px"
            mx="auto"
            my={6}>
            <Card.Body>
                <VStack spacing={4} align="stretch">

                    <Field.Root required mt={3}>
                        <Field.Label fontWeight="bold">
                            First name: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="firstName"
                            bgColor="white"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                        />
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required mt={3}>
                        <Field.Label fontWeight="bold">
                            Last name: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="lastName"
                            bgColor="white"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                        />
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>

                    <Field.Root mt={3}>
                        <Field.Label fontWeight="bold">
                            Username:
                        </Field.Label>
                        <Input
                            name="username"
                            bgColor="white"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </Field.Root>

                    <Field.Root required mt={3}>
                        <Field.Label fontWeight="bold">
                            Email: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="email"
                            bgColor="white"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>

                    <HStack justify="flex-end">
                        <Button variant="ghost" onClick={onCancel} type="button">Cancel</Button>
                        <Button colorScheme="blue" onClick={() => onSave(formData)} type="submit">Save</Button>
                    </HStack>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
};

export default UserAccountForm;
