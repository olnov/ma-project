const User = require('../models/user');

const registerUser = async (firstName, lastName, email) => {
    if (!firstName || !lastName || !email) {
        throw new Error('All fields are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create a new user
    const newUser = new User({
        firstName,
        lastName,
        email
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
}

module.exports = {
    registerUser,
};