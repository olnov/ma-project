import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { patchUserProfile } from "../../services/userService";
import { useState } from "react";
import UpdateUserAttribute from "./UpdateUserAttribute";
import DisplayUserAccount from "../../pages/UserProfile";

const UpdateUserProfile = () =>  {
    const { getAccessTokenSilently } = useAuth0();

    const navigate = useNavigate();
    // const [field, setField] = useState("");
    const [firstName, setFirstName] = useState("");
    // const [newValue, setNewValue] = useState();

    const handleValueChange = (event) => {
        // setNewValue(event.target.value);
        setFirstName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {};

        try {
            const token = await getAccessTokenSilently();
            // payload[field] = newValue;
            payload.firstName = firstName;
            const user = await patchUserProfile(token, payload);
            console.log("UPDATED USER:", user);

            navigate('/me');

        } catch (error) {
            console.error("Error sending patch request", error);
            // navigate('/users/me')
        }
    };

    // const handleFieldChange = (event) => {
    //     setField(event.target.value);
    // };
    
    

    return (
        <>
        <br />
        <br />
        <DisplayUserAccount />
        <br />
            <form action="" method="PATCH" onSubmit={handleSubmit}>

                <label htmlFor="FirstName">
                    <input
                    id="FirstName"
                    type="First name"
                    name="First name"
                    value={firstName}
                    onChange={handleValueChange}
                    />
                </label>

                {/* <UpdateUserAttribute 
                    field="firstName"
                    type="First name"
                    name="First name"
                    value={firstName}
                    onChange={handleValueChange}
                /> */}


                <button 
                role="submit-button"
                id="submit"
                type="submit"
                name="submit">
                    Submit
                </button>

            </form>
        </>
    );
};

export default UpdateUserProfile;