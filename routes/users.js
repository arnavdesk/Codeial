const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/comment", usersController.comment);

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
router.get("/sign-out", usersController.destroySession);

module.exports = router;