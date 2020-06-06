const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller")


router.get("/", homeController.home);

console.log("router is present");




module.exports = router;

