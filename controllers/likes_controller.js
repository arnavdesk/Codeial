const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/Comment");

module.exports.toggleLike = async function (request, response) {
    try {
        // likes/toggle?id=abcdef&type=Post
        let likeable;
        let deleted = false;
        if (request.query.type == "Post") {
            likeable = await Post.findById(request.query.id).populate("likes");
        } else {
            likeable = await Comment.findById(request.query.id).populate("likes");
        }

        // check if like exists
        let existingLike = await Like.findOne({ likeable: request.query.id, onModel: request.query.type, user: request.user._id });

        // if a like exist delete it else make a like
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        } else {
            let newLike = await Like.create({
                user: request.user._id,
                likeable: request.query.id,
                onModel: request.query.type,
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return response.status(200).json({
            message: "Successful!",
            data: {
                deleted:deleted,
            }
        });

    }
    catch (err) {
        console.log(err);
        return response.status(200).json({
            message: "Internal Server Error!"
        });
    }
}