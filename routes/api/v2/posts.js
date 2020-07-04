const express = require("express");
const router = express.Router();
const passport = require("passport");
const postApi = require("../../../controllers/api/v2/post_api");

router.delete("/",passport.authenticate("jwt",{session:false}),postApi.destroy);
router.get("/all",postApi.index);


module.exports = router;