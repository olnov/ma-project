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

// const updateUserAttribute = async (auth0Sub, fields, updates) => {
    //     const user = await getUserByauth0Sub(auth0Sub);
    //     user.map((field) => user.fields = )
    // }
    
//if updates comes in the form of an object e.g. {email: xx, firstName: xx, lastName: }
const updateUserProfile = async (auth0Sub, updates) => {
    try { 
        const user = await User.findOneAndUpdate(
            { auth0Id: auth0Sub },
            { $set: updates },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found for updates.");
        }

        console.log("User attributes updated successfully.");
        return user;

    } catch (error) {
        console.error("Error updating user attributes:", error);
        throw error;
    }
};

const updateUserLastName = async (auth0Sub, lastName) => {
    const user = await getUserByauth0Sub(auth0Sub);

    try {
        const result = await user.updateOne({
            $set: {
                lastName: lastName
            },
            new: true
        });
        console.log("User's lastName field successfully updated. User's lastName now", user.lastName);
        return result;

    } catch (error) {
        console.error("Error updating user's lastName field:", error);
        throw error
    }
};

// with mongoose/ vanilla JS
const updateUserFirstName = async (auth0Sub, firstName) => {
    const user = await getUserByauth0Sub(auth0Sub);

    try {
        user.firstName = firstName;
        await user.save();
        console.log("User's firstName field successfully updated. User's firstName now", user.firstName);
        return user;

    } catch (error) {
        console.log("Error updating users firstName field:", error);
        throw error;
    }
};

module.exports = { getUserByauth0Sub, createUser, updateUserProfile};