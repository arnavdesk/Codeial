const express = require("express");
const router = express.Router();
const passport = require("passport");

const friendshipController = require("../controllers/friendship_controller");

router.get("/follow-friend", passport.checkAuthentication ,friendshipController.followFriend);

module.exports = router;