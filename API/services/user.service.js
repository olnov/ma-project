const User = require("../models/user");

const getUserByauth0Sub = async (auth0Sub) => {
    try {
        const user = await User.findOne({ auth0Id: auth0Sub });
        return user;

    } catch (error) {
        console.error("Error retireving user: ", error);
        throw error;
    }
};

const createUser = async (auth0Sub, userProfile) => {
    const { email, nickname, given_name, family_name } = userProfile;

    if (!auth0Sub || !email) {
        throw new Error("A valid auth0 sub and email are required.");
    }

    try {
        const user = await User.create({
            auth0Id: auth0Sub,
            email: email,
            firstName: given_name || "",
            lastName: family_name || "",
            username: nickname || "",
        });
        console.log("New user created successfully: ", user);
        return user;

    } catch (error) {
        console.error("error creating new user: ", error);
        throw error;
    }
};

module.exports = { getUserByauth0Sub, createUser};