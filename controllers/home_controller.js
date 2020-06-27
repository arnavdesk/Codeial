const Posts = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (request, response) {
    // console.log(request.cookies);
    // response.cookie("user_id", 25);
    // response.cookie("user_id_new", 25);

    // populate user of each page
    try {
        let postsList = await Posts.find({})
            .sort("-createdAt")
            .populate("user")
            .populate({ path: "comment", populate: { path: "user" } });
            
        let allUsers = await User.find({});

        return response.render("home", { title: "Home", posts_list: postsList, all_users: allUsers });
    }
    catch(err){
        console.log("Error : ", err);
    }

}

