const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/comment", usersController.comment);

router.get("/sign-in", passport.checkSessionPresent, usersController.signIn);
router.get("/sign-up", passport.checkSessionPresent, usersController.signUp);

router.post("/create", usersController.create);

router.post("/update", passport.checkAuthentication ,usersController.update);


// use passpt as a middleware to auth
router.post("/create-session", passport.authenticate(
    "local",
    { failureRedirect: "/users/sign-in" }
), usersController.createSession);

router.get("/sign-out", usersController.destroySession);

// route for google authentication
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// callback for google authentication and create session
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "users/sign-in" }), usersController.createSession);


module.exports = router;