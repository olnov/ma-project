// This is a stub controller for handling user login.
// TODO: Remove or replace with the actual Auth0 login logic.

const jwt = require('jsonwebtoken');

const fakeUser = {
    id: '8f78d1ca-b917-4dbd-912b-1f10d05691f9',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'password!1'
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email === fakeUser.email && password === fakeUser.password) {
        const accessToken = jwt.sign({ sub: fakeUser.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

module.exports = {
    login
};