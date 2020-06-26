const Posts = require("../models/post");
const User = require("../models/user");
module.exports.home = function (request, response) {
    // console.log(request.cookies);
    // response.cookie("user_id", 25);
    // response.cookie("user_id_new", 25);

    // populate user of each page
    Posts.find({}).populate("user").populate({ path: "comment", populate: { path: "user" } }).exec(function (err, postsList) {
        User.find({},function(err,allUsers){
            if (err) {
                console.log("cannot find any post!");
                return response.render("home", { title: "Home", posts_list: {}, all_users:{} });
            }
            else {
                console.log(postsList)
                return response.render("home", { title: "Home", posts_list: postsList, all_users:allUsers });
            }
        })
    })
}

