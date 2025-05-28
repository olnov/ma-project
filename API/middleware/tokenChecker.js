// This is a stub middleware function that checks for a JWT token in the request headers.
// TODO: Replace with the actual Auth0 token verification logic.

const { verify } = require("jsonwebtoken");

const tokenChecker = (req, res, next) => {
    let accessToken;
    const authHeader = req.get("Authorization");

    if (authHeader) {
        accessToken = authHeader.slice(7);
    }
    verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
        res.status(401).json({ message: "You are not authenticated" });
    } else {
        req.sub = payload.sub;
        next();
    }
    });
};

module.exports = { tokenChecker };