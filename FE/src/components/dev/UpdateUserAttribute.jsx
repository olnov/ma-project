import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { patchUserProfile } from "../../services/userService";
import { useState } from "react";

const UpdateUserAttribute = (props) => {
    const { getAccessTokenSilently } = useAuth0();

    const navigate = useNavigate();
    const [field, setField] = useState("");
    const [newValue, setNewValue] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {};
        try {
            const token = await getAccessTokenSilently();
            payload[field] = newValue;
            await patchUserProfile(token, payload);
            navigate('/users/me');
        } catch (error) {
            console.error("Error sending patch request", error);
            // navigate('/users/me')
        }
    };

    const handleFieldChange = (event) => {
        setField(event.target.value);
    };
    
    const handleValueChange = (event) => {
        setNewValue(event.target.value);
    };

    return (
        <>
            <label htmlFor="">
                <input 
                type={field}
                name={field}
                value={field}
                onChange={handleValueChange}
                />
            </label>
        </>
    );
};

export default UpdateUserAttribute;