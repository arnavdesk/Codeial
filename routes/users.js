const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/comment", usersController.comment);

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.get("/create", usersController.create);
router.get("/create-session", usersController.createSession);

module.exports = router;