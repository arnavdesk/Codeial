const Post = require("../models/post");
const Comment = require("../models/Comment");
const commentsMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");
const Like = require("../models/like");


module.exports.createComment = async function (request, response) {
    request.body.user = request.user._id;
    // console.log(request.body);
    try {
        let foundPost = await Post.findById(request.body.post);
        if (foundPost) {
            let newComment = await Comment.create(request.body);
            foundPost.comment.push(newComment);
            foundPost.save();
            await newComment.populate("user").execPopulate();
            // commentsMailer.newCommentMailer(newComment);
            let job = queue.create("emails", newComment).save(function(err){
                if(err){
                    console.log("Error in KUE -> ERR");
                }
                else{
                    console.log(job.id);
                }
            })
            console.log("Comment Created : " + newComment);
        }
        return response.redirect("back");

    }
    catch (err) {
        console.log("Error : ", err);
    }
    // Post.findById(request.body.post, function (err, foundPost) {
    //     if (err) {
    //         console.log("error in finding a comment");
    //         return response.redirect("back");
    //     }
    //     else {
    //         Comment.create(request.body, function (err, newComment) {
    //             if (err) {
    //                 console.log("error in creating a comment");
    //                 return response.redirect("back");
    //             }
    //             else {
    //                 foundPost.comment.push(newComment);
    //                 foundPost.save();
    //                 console.log("Comment Created : " + newComment);
    //                 return response.redirect("back");
    //             }
    //         })
    //     }
    // })

}


module.exports.destroy = async function (request, response) {

    try {
        let foundComment = await Comment.findById(request.query.id);

        if (foundComment.user = request.user.id) {
            let postId = foundComment.post;
            foundComment.remove();
            await Like.deleteMany({likeable:foundComment._id,onModel:"Comment"});
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comment: request.query.id } });
            console.log(post);
            return response.redirect("back");
        }
        else {
            console.log("Unauthorized to do this!");
            return response.redirect("back");
        }
    }
    catch (err) {
        console.log(err);
    }


    // Comment.findById(request.query.id, function (err, foundComment) {
    //     if (err) {
    //         console.log("error in finding a comment");
    //         return response.redirect("back");
    //     }

    //     if (foundComment.user = request.user.id) {
    //         let postId = foundComment.post;
    //         foundComment.remove();
    //         Post.findByIdAndUpdate(postId, { $pull: { comment: request.query.id } }, function (err, post) {
    //             if (err) {
    //                 console.log("Error in deleting ID in post!");
    //             }
    //             console.log("DONNEEE");
    //             return response.redirect("back");
    //         })
    //     }
    //     else {
    //         console.log("Unauthorized to do this!");
    //         return response.redirect("back");
    //     }
    // })
}