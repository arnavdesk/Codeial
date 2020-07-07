const User = require("../models/user");
const Friendship = require("../models/friendships");


module.exports.followFriend = async function(request, response){
    const toId = request.query.id;
    let friendship;
    friendship = await Friendship.findOne({from:request.user._id,to:toId});
    
    if(friendship){
        await User.findByIdAndUpdate(request.user._id, { $pull: { following: toId } });
        await User.findByIdAndUpdate(toId, { $pull: { followers: request.user._id } });
        friendship.remove();
    }else{
        let user = await  User.findById(request.user._id);
        let toUser = await  User.findById(toId);
        friendship = await Friendship.create({from:request.user._id,to:toId});
        user.following.push(toId);
        user.save();
        toUser.followers.push(user._id);
        toUser.save();
    }
    

    return  response.redirect("back");
}