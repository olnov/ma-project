import {
    Box,
    Button,
    Card,
    HStack,
    Input,
    FormErrorMessage,
    FormLabel,
    FormControl,
    VStack,
    Field,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UserAccountForm = ({ dbUser, onSave, onCancel }) => {
    
    const [formData, setFormData] = useState({
        firstName: dbUser.firstName || "",
        lastName: dbUser.lastName || "",
        username: dbUser.username || "",
        email: dbUser.email || "",
    });

    const { register, watch } = useForm();

    const [isFormValid, setIsFormValid] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const { firstName, lastName, email, username } = watch();

    useEffect(() => {
        const errors = {};

        if (formData.firstName.trim() === '') {
        errors.firstName = 'First name cannot be empty.';
        }

        if (formData.lastName.trim() === '') {
        errors.lastName = 'Last name cannot be empty.';
        }

        if (!formData.email.includes('@')) {
        errors.email = 'Invalid email address.';
        }
        // if (formData.username.split(" ").length > 1) {
        if (!formData.username.includes('" "')) {
        errors.username = 'Username cannot contain spaces.';
        }

        setFieldErrors(errors);

        const isEmailValid = formData.email.includes('@');
        const areNamesValid = formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
        const isUsernameValid = formData.username.includes('@');

        setIsFormValid(isEmailValid && areNamesValid && isUsernameValid);
//   }, [formData.firstName, formData.lastName, formData.email, formData.username]);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card.Root
                bgColor="orange.50"
                shadow="md"
                maxW="600px"
                mx="auto"
                my={6}>
                <Card.Body>
                    <VStack spacing={4} align="stretch">

                        <Field.Root required mt={3}>
                            <FormLabel fontWeight="bold">
                                First name: <Field.RequiredIndicator />
                            </FormLabel>
                            <Input
                                name="firstName"
                                type="text"
                                bgColor="white"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                            />
                            {fieldErrors.firstname && (
                                <Text>{fieldErrors.firstName}</Text>
                            )}
                            {/* <Field.ErrorText>This field is required</Field.ErrorText> */}
                        </Field.Root>

                        <Field.Root required mt={3}>
                            <FormLabel fontWeight="bold">
                                Last name: <Field.RequiredIndicator />
                            </FormLabel>
                            <Input
                                name="lastName"
                                type="text"
                                bgColor="white"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                            />
                            {fieldErrors.lastName && (
                                <Text>{fieldErrors.lastName}</Text>
                            )}
                            {/* <Field.ErrorText>This field is required</Field.ErrorText> */}
                        </Field.Root>

                        <Field.Root mt={3}>
                            <FormLabel fontWeight="bold">
                                Username:
                            </FormLabel>
                            <Input
                                name="username"
                                type="text"
                                bgColor="white"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            {fieldErrors.username && (
                                <Text>{fieldErrors.username}</Text>
                            )}
                        </Field.Root>

                        <Field.Root required mt={3}>
                            <FormLabel fontWeight="bold">
                                Email: <Field.RequiredIndicator />
                            </FormLabel>
                            <Input
                                name="email"
                                type="email"
                                bgColor="white"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            {fieldErrors.email && (
                                <Text>{fieldErrors.email}</Text>
                            )}
                            {/* <Field.ErrorText>This field is required</Field.ErrorText> */}
                        </Field.Root>

                        <HStack justify="flex-end">
                            <Button
                            variant="ghost"
                            onClick={onCancel}
                            type="button">
                                Cancel
                            </Button>
                            <Button
                            colorScheme="blue"
                            onClick={() => onSave(formData)}
                            type="submit"
                            diabled={!isFormValid}>
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </Card.Body>
            </Card.Root>
        </form>

        // <Card.Root
        //     bgColor="orange.50"
        //     shadow="md"
        //     maxW="600px"
        //     mx="auto"
        //     my={6}>
        //     <Card.Body>
        //         <VStack spacing={4} align="stretch">

        //             <Field.Root required mt={3}>
        //                 <Field.Label fontWeight="bold">
        //                     First name: <Field.RequiredIndicator />
        //                 </Field.Label>
        //                 <Input
        //                     name="firstName"
        //                     type="text"
        //                     bgColor="white"
        //                     value={formData.firstName}
        //                     onChange={handleChange}
        //                     placeholder="First name"
        //                 />
        //                 <Field.ErrorText>This field is required</Field.ErrorText>
        //             </Field.Root>

        //             <Field.Root required mt={3}>
        //                 <Field.Label fontWeight="bold">
        //                     Last name: <Field.RequiredIndicator />
        //                 </Field.Label>
        //                 <Input
        //                     name="lastName"
        //                     type="text"
        //                     bgColor="white"
        //                     value={formData.lastName}
        //                     onChange={handleChange}
        //                     placeholder="Last name"
        //                 />
        //                 <Field.ErrorText>This field is required</Field.ErrorText>
        //             </Field.Root>

        //             <Field.Root mt={3}>
        //                 <Field.Label fontWeight="bold">
        //                     Username:
        //                 </Field.Label>
        //                 <Input
        //                     name="username"
        //                     type="text"
        //                     bgColor="white"
        //                     value={formData.username}
        //                     onChange={handleChange}
        //                     placeholder="Username"
        //                 />
        //             </Field.Root>

        //             <Field.Root required mt={3}>
        //                 <Field.Label fontWeight="bold">
        //                     Email: <Field.RequiredIndicator />
        //                 </Field.Label>
        //                 <Input
        //                     name="email"
        //                     type="email"
        //                     bgColor="white"
        //                     value={formData.email}
        //                     onChange={handleChange}
        //                     placeholder="Email"
        //                 />
        //                 <Field.ErrorText>This field is required</Field.ErrorText>
        //             </Field.Root>

        //             <HStack justify="flex-end">
        //                 <Button variant="ghost" onClick={onCancel} type="button">Cancel</Button>
        //                 <Button colorScheme="blue" onClick={() => onSave(formData)} type="submit">Save</Button>
        //             </HStack>
        //         </VStack>
        //     </Card.Body>
        // </Card.Root>
    );
};

export default UserAccountForm;
