const Post = require("../models/post");
module.exports.view = function (request, response) {
    return response.end("Well This is a post");
}

module.exports.createPost = function (request, response) {
    request.body.user = request.user._id;
    Post.create(request.body, function (err, newPost) {
        if (err) {
            console.log("error in creating a post")
            return response.redirect("back");
        }
        else {
            console.log("Post Created : " + newPost);
            return response.redirect("back");
        }
    })
}