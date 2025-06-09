const User = require('../models/user');

// If user doesn't exist, create new user with claims from Auth0 ID token (authentication provided by Access token)
const syncUser = async (req, res) => {
  
  const sub = req.auth.payload.sub; //Always get sub from Access token (decoded with checkJwt), not from ID token
  const { email, nickname, given_name, family_name } = req.body.user; //user info extracted from decoded ID token

  let user = await User.findOne({ auth0Id: sub });

  console.log("CONTROLLER LINE 13");

  if (!user) {
    user = await User.create({
      auth0Id: sub,
      email: email,
      firstName: given_name || "",
      lastName: family_name || "",
      username: nickname || "",
    });
    console.log("User created");
  } else {
    console.log("User already in database");
  }
  res.status(200).json({ message: "User synced", user: user });
};

const getUser = async (req, res) => {
    const sub = req.auth.payload.sub;

    let user = await User.findOne({ auth0Id: sub });

    if (!user) {
        return res.status(404).json({ message: "Can't seem to find that user..."});
    }

    res.status(200).json({ user: user });
};

module.exports = { syncUser, getUser };
