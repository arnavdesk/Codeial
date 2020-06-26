const Post = require("../models/post");
const Comment = require("../models/Comment");

module.exports.createComment = function (request, response) {
    request.body.user = request.user._id;
    console.log(request.body);
    Post.findById(request.body.post, function (err, foundPost) {
        if (err) {
            console.log("error in finding a comment");
            return response.redirect("back");
        }
        else {
            Comment.create(request.body, function (err, newComment) {
                if (err) {
                    console.log("error in creating a comment");
                    return response.redirect("back");
                }
                else {
                    foundPost.comment.push(newComment);
                    foundPost.save();
                    console.log("Comment Created : " + newComment);
                    return response.redirect("back");
                }
            })
        }
    })

}


module.exports.destroy = function (request, response) {
    Comment.findById(request.query.id, function (err, foundComment) {
        if (err) {
            console.log("error in finding a comment");
            return response.redirect("back");
        }

        if (foundComment.user = request.user.id) {
            let postId = foundComment.post;
            foundComment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comment: request.query.id}}, function(err,post){
                if(err){
                    console.log("Error in deleting ID in post!");
                }
                console.log("DONNEEE");
                return response.redirect("back");
            })
        }
        else{
            console.log("Unauthorized to do this!");
            return response.redirect("back");
        }
    })
}