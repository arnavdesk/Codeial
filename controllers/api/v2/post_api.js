const Posts = require("../../../models/post");
const Comment = require("../../../models/Comment");

module.exports.index = async function (request, response) {

    try {
        let postsList = await Posts.find({})
            .sort("-createdAt")
            .populate("user")
            .populate({ path: "comment", populate: { path: "user" } });

        return response.json(200, {
            version: "v2",
            message: "Posts",
            data: {
                posts: postsList
            }
        });
    }
    catch (err) {
        console.log("Error : ", err);
    }

}


module.exports.destroy = async function (request, response) {
    try {
        let foundPost = await Posts.findById(request.query.id);
        if(foundPost.user == request.user.id){
            await foundPost.remove();
            await Comment.deleteMany({ post: request.query.id });
    
            return response.status(200).json({
                data: {
                    id: request.query.id
                },
                message: "POST AND ASSOCIATED DELETED!"
            });
        }else{
            return response.json(401, {
                message:"Unauthorized to delete post!"
            })
        }
       
    }
    catch (err) {
        console.log(err);
        return response.json(500,{
            message:"Internal Server Error"
        })
    }

}