const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controllers/posts_controller");


router.get("/view", passport.checkAuthentication, postController.view);

router.post("/create-post", passport.checkAuthentication, postController.createPost);

router.get("/destroy", passport.checkAuthentication, postController.destroy);

module.exports = router;