const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/comment", usersController.comment);

router.get("/sign-in", passport.checkSessionPresent, usersController.signIn);
router.get("/sign-up", passport.checkSessionPresent, usersController.signUp);

router.post("/create", usersController.create);

// use passpt as a middleware to auth
router.post("/create-session", passport.authenticate(
    "local",
    { failureRedirect: "/users/sign-in" }
), usersController.createSession);

router.get("/sign-out", usersController.destroySession);

module.exports = router;