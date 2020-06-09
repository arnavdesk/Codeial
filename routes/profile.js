const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile_controller");

router.get("/", profileController.view);


module.exports = router;