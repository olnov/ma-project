import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;


// import { useAuth0 } from '@auth0/auth0-react'

// const UserProfile = () => {
//   const { user, isAuthenticated } = useAuth0()

//   if (!isAuthenticated) return null

//   return (
//     <div>
//       <p>Logged in as: {user.name}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   )
// }

// export default UserProfile
