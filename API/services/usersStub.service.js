const User = require('../models/user');

const registerUser = async (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
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
        email,
        password 
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
}

module.exports = {
    registerUser,
};