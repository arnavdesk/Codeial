const Post = require("../models/post");
const Comment = require("../models/Comment");


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

module.exports.destroy = function (request, response) {
    Post.findById(request.query.id, function (err, foundPost) {
        if (err) {
            console.log("error in finding the post")
            return response.redirect("back");
        }
        else {
            // .id means string id converted from ObjectID
            if (foundPost.user == request.user.id) {
                foundPost.remove();
                Comment.deleteMany({ post: request.query.id }, function (err) {
                    if (err) {
                        console.log("Unable to delete");
                        return response.redirect("back");
                    }
                    else {
                        console.log("Deleted the post and comments");
                        return response.redirect("back");
                    }
                })
            }
            else {
                console.log("Unauthorized to do this!")
                return response.redirect("back");
            }
        }
    })
}