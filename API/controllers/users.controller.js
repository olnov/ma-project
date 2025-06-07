const User = require('../models/user');

// check if user exits
    // if not, create user
    // if exists, update user model with credentails from Auth0

const syncUser = async (req, res) => {
  const { sub, email, name, given_name, family_name } = req.auth;

  let user = await User.findOne({ auth0Id: sub });

  if (!user) {
    user = await User.create({
      auth0Id: sub,
      email: email,
      firstName: given_name || "",
      lastName: family_name || "",
      username: name || "",
    });
  }

  res.status(200).json({ message: "User synced", user });
};

const getUser = async (req, res) => {
    const sub = req.auth.sub;

    let user = await User.findOne({ auth0id: sub });

    if (!user) {
        return res.status(404).json({ message: "Can't seem to find that user..."});
    }

    res.status(200).json({ user: user });
};

module.exports = { syncUser };
