const Posts = require("../models/post");
module.exports.home = function (request, response) {
    // console.log(request.cookies);
    // response.cookie("user_id", 25);
    // response.cookie("user_id_new", 25);

    // populate user of each page
    Posts.find({}).populate("user").exec(function (err, postsList) {
        if (err) {
            console.log("cannot find any post!");
            return response.render("home", { title: "Home", posts_list: {} });
        }
        else {
            console.log(postsList)
            return response.render("home", { title: "Home", posts_list: postsList });
        }
    })
}

