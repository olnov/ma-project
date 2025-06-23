import {
    Box,
    Button,
    Card,
    HStack,
    VStack,
    Input,
} from "@chakra-ui/react";
import { 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";

const UserAccountForm = ({ dbUser, onSave, onCancel }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: dbUser.firstName || "",
            lastName: dbUser.lastName || "",
            username: dbUser.username || "",
            email: dbUser.email || "",
        },
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    return (  
        <Card.Root
            bgColor="orange.50"
            shadow="md"
            maxW="600px"
            mx="auto"
            my={6}
        >
            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch">
                        
                        {/* First Name */}
                        <FormControl isInvalid={!!errors.firstName} isRequired mt={3}>
                            <FormLabel fontWeight="bold">First name</FormLabel>
                            <Input
                                type="text"
                                placeholder="First name"
                                bg="white"
                                {...register("firstName", {
                                required: "First name is required",
                                })}
                            />
                            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Last Name */}
                        <FormControl isInvalid={!!errors.lastName} isRequired mt={3}>
                            <FormLabel fontWeight="bold">Last name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Last name"
                                bg="white"
                                {...register("lastName", {
                                required: "Last name is required",
                                })}
                            />
                            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Username */}
                        <FormControl isInvalid={!!errors.username} mt={3}>
                            <FormLabel fontWeight="bold">Username</FormLabel>
                            <Input
                                type="text"
                                placeholder="Username"
                                bg="white"
                                {...register("username", {
                                validate: (value) =>
                                    !/\s/.test(value) || "Username cannot contain spaces",
                                })}
                            />
                            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Email */}
                        <FormControl isInvalid={!!errors.email} isRequired mt={3}>
                            <FormLabel fontWeight="bold">Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email"
                                bg="white"
                                {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Invalid email address",
                                },
                                })}
                            />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        {/* Buttons */}
                        <HStack justify="flex-end">
                            <Button
                                variant="ghost"
                                onClick={onCancel}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="blue"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>        
    );
};

export default UserAccountForm;
