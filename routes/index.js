const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller")


router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/profile", require("./profile"));

console.log("router is present");




module.exports = router;

