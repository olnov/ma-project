const User = require('../models/user');
const {getUserByauth0Sub, createUser, updateUserProfile } = require('../services/user.service');

const getUser = async (req, res) => {
    const auth0Sub = req.auth.payload.sub; 
    //Always get sub from Access token (decoded with checkJwt), not from ID token

    if (!auth0Sub) {
        return res.status(400).json({ error: "Auth0 sub missing from token payload." });
    } 

    let user;
    try {
      user = await getUserByauth0Sub(auth0Sub);
      // {
      //   "sub":"sdfsdf",
      //   "email":"
      // }

      if (!user) {
        return res.status(404).json({ message: "Can't seem to find that user..."});
      }
      res.status(200).json({ user: user });

    } catch (error) {
      console.error("Error fetching user:", error);;
    }
};


// If user doesn't exist in DB, create new user in DB with claims from Auth0 ID token (authentication provided by Access token)
const syncUser = async (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  //Always get sub from Access token (decoded with checkJwt), not from ID token
  console.log("syncUser called with auth0Sub:", auth0Sub);

  if (!auth0Sub) {
    return res.status(400).json({ error: "Auth0 sub missing from token payload." });
  }

  let user;
  try {
    user = await getUserByauth0Sub(auth0Sub);

    if (!user) {
      user = await createUser(auth0Sub, req.body.user); //user info extracted from decoded ID token
      res.status(200).json({ message: "User added to database", user: user });

    } else {
      console.log("User already in database:", user);
      res.status(200).json({ message: "User already exists", user: user });
    }

  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
};


const updateUser = async (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  //Always get sub from Access token (decoded with checkJwt), not from ID token
  
  const updates = req.body.updates;

  if (!auth0Sub) {
    return res.status(400).json({ error: "Auth0 sub missing from token payload." });
  }

  if (!updates || typeof(updates) !== "object") {
    // Ensure updates is an object
    return res.status(400).json({ error: "Missing or invalid updates payload." });
  }

  const allowedFields = ["email", "firstName", "lastName", "username"];
  const filteredUpdatesAsArray = Object.entries(updates).filter(
      ([key]) => allowedFields.includes(key)
    );
  // filter applied to updates to ensure auth0Id is not updated accidentally
  const filteredUpdates = Object.fromEntries(filteredUpdatesAsArray)

  try {
    const user = await updateUserProfile(auth0Sub, filteredUpdates);
    res.status(200).json({ message: "User updated", user: user });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error while updating user" });
  }
};


module.exports = { getUser, syncUser, updateUser};
