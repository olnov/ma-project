import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { patchUserProfile } from "../../services/userService";

const UpdateProfileAttribute = () => {
    const { user } = useAuth0();


    return (

    );
};

export default UpdateProfileAttribute;