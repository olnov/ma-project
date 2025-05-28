// This is a stub route for tetsting.
// TODO: Replace with the actual Auth0 login logic.

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authStub.controller.js');

router.post('/login', login);

module.exports = router;