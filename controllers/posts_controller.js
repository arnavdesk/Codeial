const Post = require("../models/post");
const Comment = require("../models/Comment");
const User = require("../models/user");


module.exports.view = function (request, response) {
    return response.end("Well This is a post");
}

module.exports.createPost = async function (request, response) {
    request.body.user = request.user._id;

    try {
        let newPostUnP = await Post.create(request.body);
        let newPost = await newPostUnP.populate("user",'-password').execPopulate();
        
        console.log("Post Created : " + newPost);
        console.log(request.header("X-type"));
        if (request.header("X-type") == "fetch") {
            return response.status(200).json({
                data: {
                    post: newPost
                },
                message: "POST CREATED!"
            });
        }
        return response.redirect("back");
    }
    catch (err) {
        console.log(err);
        return response.redirect("back");
    }

    // Post.create(request.body, function (err, newPost) {
    //     if (err) {
    //         console.log("error in creating a post")
    //         return response.redirect("back");
    //     }
    //     else {
    //         console.log("Post Created : " + newPost);
    //         return response.redirect("back");
    //     }
    // })
}

module.exports.destroy = async function (request, response) {

    try {
        let foundPost = await Post.findById(request.query.id);

        // .id means string id converted from ObjectID
        if (foundPost.user == request.user.id) {
            foundPost.remove();
            await Comment.deleteMany({ post: request.query.id });

            if (request.header("X-type") == "fetch") {
                return response.status(200).json({
                    data: {
                        id:request.query.id
                    },
                    message: "POST DELETED!"
                });
            }

            return response.redirect("back");
        }
        else {
            console.log("Unauthorized to do this!")
            return response.redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return response.redirect("back");
    }




    // Post.findById(request.query.id, function (err, foundPost) {
    //     if (err) {
    //         console.log("error in finding the post")
    //         return response.redirect("back");
    //     }
    //     else {
    //         // .id means string id converted from ObjectID
    //         if (foundPost.user == request.user.id) {
    //             foundPost.remove();
    //             Comment.deleteMany({ post: request.query.id }, function (err) {
    //                 if (err) {
    //                     console.log("Unable to delete");
    //                     return response.redirect("back");
    //                 }
    //                 else {
    //                     console.log("Deleted the post and comments");
    //                     return response.redirect("back");
    //                 }
    //             })
    //         }
    //         else {
    //             console.log("Unauthorized to do this!")
    //             return response.redirect("back");
    //         }
    //     }
    // })
}