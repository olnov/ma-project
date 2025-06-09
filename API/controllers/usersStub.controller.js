const { registerUser } = require('../services/usersStub.service.js');

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    // Store user in the database
    try {
        const newUser = await registerUser(firstName, lastName, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    register
};