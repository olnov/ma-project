const express = require("express");
const { syncUser, getUser, updateUser } = require("../controllers/users.controller")
const checkJwt = require("../middleware/checkJwt");

const router = express.Router();

router.post("/sync", checkJwt, syncUser);
router.get("/me", checkJwt, getUser);
router.patch("/me/update-profile", checkJwt, updateUser);

module.exports = router;
