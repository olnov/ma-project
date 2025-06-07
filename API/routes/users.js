const express = require("express");
const { syncUser } = require("../controllers/users.controller")
const checkJwt = require("../middleware/checkJwt");

const router = express.Router();

router.post("/sync", checkJwt, syncUser);
router.get("/me", checkJwt, getUser)

module.exports = router;
